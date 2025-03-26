import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>Hello in simple chat</h1>
        <button onClick={() => navigate("login")}>Get Started</button>
      </div>
    </div>
  );
};
