import styles from "./ChatScreen.module.css";
import { SendHorizontal } from "lucide-react";

export const ChatScreen = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <div className={styles.chat__content}></div>
          <div className={styles.chat__input__container}>
            <input className={styles.chat__input} />
            <button className={styles.chat__button}>
              {<SendHorizontal />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
