import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen.jsx';
import { ChatScreen } from './components/ChatScreen/ChatScreen';
import { Home } from './components/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="chat" element={<ChatScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
