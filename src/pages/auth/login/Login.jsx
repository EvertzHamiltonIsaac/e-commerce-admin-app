import React, { useCallback, useState } from "react";
import Input from "../../../components/app/input/Input";
import './login-styles.css'
import LoginContainer from "../../../components/pages/login/loginContainer/LoginContainer";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const message = "Sign in to take advantage of all the management tools and functions available for your e-commerce."
  const InputsArray = [
    {
      Id: "email",
      type: "email",
      name: "email",
      classNameInput: "form-control",
      labelValue: "Enter your email address",
    },
    {
      Id: "password",
      type: "password",
      classNameInput: "form-control",
      labelValue: "Enter your password",
      name: "password",
    },
  ];

  const handleFormData = (option, data) => {
    const writeInFormData = {
      email: () => setFormData({...formData, email: data}),
      password: () => setFormData({...formData, password: data}),
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
    <LoginContainer title="Sign In" rightMessageTitle="Welcome to Ginger Admin" rightMessage={message} image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp">
      <form onSubmit={handleOnSubmit}>
        <p>Please login to your account</p>
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
            value="Login"
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
          />
          <Link to={'forgot-password'} className="text-muted">
            Forgot password?
          </Link>
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Don't have an account?</p>
          <Link to={''} style={{color: 'red'}}>Create new</Link>
        </div>
      </form>
    </LoginContainer>
  );
};

export default Login;
