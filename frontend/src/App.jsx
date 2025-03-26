import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogginScreen } from "./components/LogginScreen";
import { ChatScreen } from "./components/ChatScreen/ChatScreen";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LogginScreen />} />
          <Route path="chat" element={<ChatScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
