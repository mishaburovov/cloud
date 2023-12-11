import React from "react";
import cs from './MyInput.module.css';


function MyInput({value, onChange, id, type, label, error}){

    return (
        <div className={cs.form__input}>
          <label htmlFor={id}>{label}</label>
          <input 
              id={id}
              type={type}
              value={value} 
              onChange={onChange}
          />
          {error && <span className={cs.errors}>{error}</span>}
        </div>
    )
}


export default MyInput;