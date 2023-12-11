import React, { useEffect, useState } from "react";
import Form from '../UI/form/form';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/user";


const props = {
  title: "Login",
}

const LoginForm = () => {
  const dispatch = useDispatch();


  const handleLogin = (email, password) => {
    dispatch(login(email, password));
  };

  return (
    <Form props={props} handleAction={handleLogin} />
  );
};

export default LoginForm;