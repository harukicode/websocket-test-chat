import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import styles from './LoginScreen.module.css';

export const RegisterScreen = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  
  const onSubmitHandler = async (data) => {
    try {
      setIsLoading(true);
      setServerError('');
      
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        setServerError(result.message);
        setIsLoading(false);
        return;
      }
      
      navigation("/login");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className={styles.container}>
      <div className={styles.login_form__container}>
        <h2 className={styles.login_form__title}>Create new account</h2>
        
        {serverError && <p className={styles.error_message}>{serverError}</p>}
        
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
            
            {errors.username && <p className={styles.error_message}>{errors.username.message}</p>}
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
            
            {errors.password && <p className={styles.error_message}>{errors.password.message}</p>}
          </label>
          
          <button className={styles.login_form__button} type="submit">
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}