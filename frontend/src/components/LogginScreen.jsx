import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LogginScreen = () => {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();

  const onSubmitHandler = (data) => {
    navigation("/chat");
    console.log(data);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>
          Username:
          <input
            {...register("username", {
              required: true,
            })}
          />
        </label>

        <button type="submit">Login In</button>
      </form>
    </div>
  );
};
