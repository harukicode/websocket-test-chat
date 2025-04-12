const express = require('express');
const session = require('express-session');
require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const { isAuthenticated } = require('./middlewares/auth.js');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, sameSite: 'lax' },
});

app.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  const userId = socket.handshake.query.userId;
  const username = socket.handshake.query.username;
  
  if (userId) {
    socket.join(`user:${userId}`);
    console.log(`User ${username} (ID: ${userId}) authenticated and joined their room`);
    
    socket.emit('connection_success', {
      message: 'Successfully connected to chat server',
      user: { id: userId, username: username },
    });
    
    socket.userId = userId;
    socket.username = username;
  }
  
  socket.on('send_message', async (messageData) => {
    const { receiverId, content } = messageData;
    
    try {
      if (!socket.userId) {
        socket.emit('error', { message: 'You must be logged in to send messages' });
        return;
      }
      
      const Message = require('./models/Message');
      
      const message = await Message.create(socket.userId, receiverId, content);
      
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
      
      const formattedMessage = {
        id: message.id,
        user: socket.username,
        text: content,
        time: formattedTime,
        senderId: socket.userId,
        receiverId: receiverId,
        isCurrentUser: true,
      };
      
      socket.emit('receive_message', formattedMessage);
      
      if (receiverId) {
        const messageForReceiver = {
          ...formattedMessage,
          isCurrentUser: false,
        };
        socket.to(`user:${receiverId}`).emit('receive_message', messageForReceiver);
      } else {
        const messageForBroadcast = {
          ...formattedMessage,
          isCurrentUser: false,
        };
        socket.broadcast.emit('receive_message', messageForBroadcast);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Error sending message' });
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.use('/api', authRoutes);
app.use('/api/messages', isAuthenticated, messageRoutes);

app.get('/', (req, res) => {
  res.send('Chat Server is Running!');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
