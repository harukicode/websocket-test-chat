import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen.jsx';
import { ChatScreen } from './components/ChatScreen/ChatScreen';
import { Home } from './components/Home';
import { RegisterScreen } from './components/RegisterScreen';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="chat" element={<ChatScreen />} />
          <Route path="register" element={<RegisterScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
