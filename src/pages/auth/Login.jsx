import React from "react";
import Input from "../../components/app/input/Input";
import './authStyles.css'

const Login = () => {
  const InputsArray = [
    {
      Id: "email",
      type: "email",
      //placeholder: "Enter your Email",
      classNameInput: "form-control",
      //classNameLabel: "form-label",
      labelValue: "Email",
    },
    {
      Id: "password",
      type: "password",
      //placeholder: "Enter your Password",
      classNameInput: "form-control",
      //classNameLabel: "form-label",
      labelValue: "Password",
    },
  ];

  return (
    <section className="form-login-background">
      <div className="form-backdrop-filter">
        <article className="rounded-3 mx-auto p-4 form-login-container">
          <h3 className="text-rigth">Login</h3>
          <p className="text-rigth">Login to your account to continue.</p>
          <form action="">
            {InputsArray.map((item, index) => (
              <div key={index}>
                <Input
                  Id={item.Id}
                  type={item.type}
                  //label={item.placeholder}
                  classNameInput={item.classNameInput}
                  //classNameLabel={item.classNameLabel}
                  labelValue={item.labelValue}
                />
              </div>
            ))}
            <button
              type="submit"
              className="border-0 px-3 py-2 btn"
              style={{ background: "var(--color-red-wine)", color: "var(--color-white)" }}
            >
              Login
            </button>
          </form>
        </article>
      </div>
    </section>
  );
};

export default Login;
