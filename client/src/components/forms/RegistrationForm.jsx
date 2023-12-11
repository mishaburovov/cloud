import React, { useState } from "react";
import Form from '../UI/form/form'
import { useDispatch } from "react-redux";
import { registration } from "../../actions/user";

const props = {
  title: "Registration",
}

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const hadnleRegistration = (email, password) => {
    dispatch(registration(email, password));
  };

  return (
    <Form props={props} handleAction={hadnleRegistration}/>
  );
};

export default RegistrationForm;