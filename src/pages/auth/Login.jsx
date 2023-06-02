import React from "react";
import Input from "../../components/app/input/Input";
import './authStyles.css'

const Login = () => {
  const InputsArray = [
    {
      Id: "email",
      type: "email",
      placeholder: "Enter your Email",
      classNameInput: "form-control",
      classNameLabel: "form-label",
      labelValue: "Email",
    },
    {
      Id: "password",
      type: "password",
      placeholder: "Enter your Password",
      classNameInput: "form-control",
      classNameLabel: "form-label",
      labelValue: "Password",
    },
  ];

  return (
    <section className="py-5 form-login-background" style={{ minHeight: "100vh", padding: '1em 1em 1em 1em'}}>
      <article className="rounded-3 mx-auto p-4 form-login-container">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          {InputsArray.map((item, index) => (
            <div key={index}>
              <Input
                Id={item.Id}
                type={item.type}
                placeholder={item.placeholder}
                classNameInput={item.classNameInput}
                classNameLabel={item.classNameLabel}
                labelValue={item.labelValue}
              />
            </div>
          ))}
          <button 
          type="submit" 
          className="border-0 px-3 py-2 btn"
          style={{background: "var(--color-red-wine)", color: "var(--color-white)"}}
          >    
          Login    
          </button>
        </form>
      </article>
    </section>
  );
};

export default Login;
