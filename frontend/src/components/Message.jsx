import styles from './Message.module.css'

export const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`${styles.message} ${isCurrentUser ? styles.own : styles.other}`}>
      <div className={styles.message__content}>
        {!isCurrentUser && (
          <div className={styles.message__user}>
            {message.user}
          </div>
        )}
        <div className={styles.message__text}>
          {message.text}
        </div>
        <div className={styles.message__time}>
          {message.time}
        </div>
      </div>
    </div>
  )
}