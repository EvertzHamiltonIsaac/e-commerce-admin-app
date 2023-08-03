import React, { useCallback, useState } from "react";
import Input from "../../components/app/input/Input";
import './login/login-styles.css'
import LoginContainer from "../../components/pages/login/loginContainer/LoginContainer";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });

  const InputsArray = [
    {
      Id: "email",
      type: "email",
      name: "email",
      classNameInput: "form-control",
      labelValue: "Enter your email address",
    },
  ];

  const handleFormData = (option, data) => {
    const writeInFormData = {
      email: () => setFormData({ ...formData, email: data }),
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
     title="Forgot your Password?"
     backgroundColor="#EEEEEE"
     rightMessageTitle="Recover your Password"
     rightMessage="Don't worry, it happens to the best of us. Please enter your email address below, and we'll send you a link to reset your password. Make sure to check your spam folder if you don't receive it within a few minutes."
     image="/Logo_CL.png"
     rightImage="/Logo_CL.png"
     >

      <form onSubmit={handleOnSubmit}>
        <p>Please enter you e-mail to send reset password mail</p>
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
            value="Send Email"
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
          />
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <div className="d-flex align-items-center justify-content-center pb-4">
            {/* <p className="mb-0 me-2">Don't have an account?</p> */}
            {/* <Link to={''} style={{ color: 'var(--color-blue-main)' }}>Create new</Link> */}
          </div>
        </div>
      </form>
    </LoginContainer>
  );
};

export default ForgotPassword;
