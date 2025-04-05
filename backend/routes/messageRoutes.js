const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const messages = await Message.getLatestMessages(userId);
    
    const formattedMessages = messages.map(msg => {
      const date = new Date(msg.created_at);
      const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
      
      return {
        id: msg.id,
        user: msg.sender_username,
        text: msg.content,
        time: formattedTime,
        senderId: msg.sender_id,
        receiverId: msg.received_id,
        isCurrentUser: msg.sender_id === userId
      };
    });
    
    res.json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

router.get("/conversation/:userId", isAuthenticated, async (req, res) => {
  try {
    const currentUserId = req.session.userId;
    const otherUserId = parseInt(req.params.userId);
    
    const messages = await Message.getConversation(currentUserId, otherUserId);
    
    const formattedMessages = messages.map(msg => {
      const date = new Date(msg.created_at);
      const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
      
      return {
        id: msg.id,
        user: msg.sender_username,
        text: msg.content,
        time: formattedTime,
        senderId: msg.sender_id,
        receiverId: msg.received_id,
        isCurrentUser: msg.sender_id === currentUserId
      };
    });
    
    res.json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching conversation" });
  }
});


module.exports = router;