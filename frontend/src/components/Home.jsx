import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.container__greeting}>Hello in simple chat</h1>
      <button
        className={styles.container__button}
        onClick={() => navigate("login")}
      >
        Get Started
      </button>
    </div>
  );
};
