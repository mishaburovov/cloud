import React, { useState } from "react";
import cs from './form.module.css';
import { useDispatch } from "react-redux";
import MyInput from "../input/MyInput";

const Form = ({ props: {title}, handleAction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
 

  const validateForm = () => {
    let errors = {};

    // Валидация электронной почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email address";
    }

    // Валидация пароля
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    setErrors(errors);

    // Если есть ошибки, возвращаем false, чтобы форма не отправлялась
    return Object.keys(errors).length === 0;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      const formData = {
        email: email,
        password: password
      };
      
      handleAction(email, password)
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cs.form}>
      <div className={cs.form__title}>
        <h2>{title}</h2>
      </div>
      <div className={cs.form__content}>
        
        <MyInput 
          value={email} 
          type={"email"} 
          id={"_email"} 
          onChange={handleEmailChange} 
          error={errors.email}
          label="Email:"
        />

        <MyInput 
          value={password} 
          type={"password"} 
          id={"_pass"} 
          onChange={handlePasswordChange} 
          error={errors.password}
          label="Password:"
        />

        <div className={cs.form__btn}>
          <button type="submit">{title}</button>
        </div>
      </div>
    </form>
  );
};

export default Form;