import React, { useCallback, useState } from "react";
import Input from "../../components/app/input/Input";
import './login/login-styles.css'
import LoginContainer from "../../components/pages/login/loginContainer/LoginContainer";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password1: '', password2: '' });

  const InputsArray = [
    {
      Id: "password1",
      type: "password",
      classNameInput: "form-control",
      labelValue: "Enter your old password",
      name: "password1",
    },
    {
      Id: "password2",
      type: "password",
      classNameInput: "form-control",
      labelValue: "Enter your new password",
      name: "password2",
    },
  ];

  const handleFormData = (option, data) => {
    const writeInFormData = {
      password1: () => setFormData({...formData, password1: data}),
      password2: () => setFormData({...formData, password2: data}),
    };
    writeInFormData[`${option}`]();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleOnChange = (target) => {
    handleFormData(target.name, target.value);
  };

  return (
    <LoginContainer 
    title="Reset Password" 
    backgroundColor="#EEEEEE"
    rightMessageTitle="Reset your password"
    rightMessage="To reset your password, please enter your new password below. Make sure to choose a strong password that is at least 8 characters long and includes a combination of letters, numbers, and special characters."
    image="/Logo_CL.png" 
    rightImage="/Logo_CL.png"
    >
      <form onSubmit={handleOnSubmit}>
        <p>Fill in both fields</p>
        {
          InputsArray.map((item, index) => (
            <Input
              key={index}
              Id={item.Id}
              type={item.type}
              name={item.name}
              classNameInput={item.classNameInput}
              labelValue={item.labelValue}
              onChange={(target) => handleOnChange(target)}
            />
          ))
        }

        <div className="login-forgot__container">
          <input
            type="submit"
            value="Reset Password"
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
          />
        </div>

      </form>
    </LoginContainer>
  );
};

export default ResetPassword;
