import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginScreen.module.css";

export const LoginScreen = () => {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();

  const onSubmitHandler = (data) => {
    navigation("/chat");

    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_form__container}>
        <h2 className={styles.login_form__title}>Login</h2>
        <form
          className={styles.login_form}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <label>
            Username:
            <input
              className={styles.login_form__username}
              {...register("username", {
                required: true,
              })}
            />
          </label>

          <label>
            Password:
            <input
              className={styles.login_form__password}
              type="password"
              {...register("password", {
                required: true,
              })}
            />
          </label>

          <button className={styles.login_form__button} type="submit">
            Login In
          </button>
          
          <div className={styles.registration_link}>
            <span>You don't have an account?</span>
            <Link to="/register">Registration</Link>
          </div>
          
        </form>
      </div>
    </div>
  );
};
