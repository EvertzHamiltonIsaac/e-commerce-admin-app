import React, { useCallback, useState } from "react";
import Input from "../../components/app/input/Input";
import "./login/login-styles.css";
import LoginContainer from "../../components/pages/login/loginContainer/LoginContainer";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../features/auth/authSlice";

const schemaForValidations = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

const ForgotPassword = () => {
  // const [formData, setFormData] = useState({ email: "" });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schemaForValidations,
    onSubmit: (values) => {
      dispatch(forgotPassword({email: values.email.toLowerCase()}));
    },
  });
  const InputsArray = [
    {
      Id: "email",
      type: "email",
      name: "email",
      classNameInput: "form-control",
      labelValue: "Enter your email address",
    },
  ];

  // const handleFormData = (option, data) => {
  //   const writeInFormData = {
  //     email: () => setFormData({ ...formData, email: data }),
  //   };
  //   writeInFormData[`${option}`]();
  // };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  // const handleOnChange = (target) => {
  //   handleFormData(target.name, target.value);
  // };

  return (
    <LoginContainer
      title="Forgot your Password?"
      backgroundColor="#EEEEEE"
      rightMessageTitle="Recover your Password"
      rightMessage="Don't worry, it happens to the best of us. Please enter your email address below, and we'll send you a link to reset your password. Make sure to check your spam folder if you don't receive it within a few minutes."
      image="/Logo_CL.png"
      rightImage="/Logo_CL.png"
    >
      <form onSubmit={formik.handleSubmit}>
        <p>Please enter you e-mail to send reset password mail</p>
        {InputsArray.map((item, index) => (
          <div key={index}>
            <Input
              key={index}
              Id={item.Id}
              type={item.type}
              name={item.name}
              value={formik.values.email}
              classNameInput={item.classNameInput}
              labelValue={item.labelValue}
              onChange={formik.handleChange(`${item?.name}`)}
            />
            <div
              className="erros_validations mb-1"
              style={{
                height: `${
                  formik.touched[`${item?.name}`] &&
                  formik.errors[`${item?.name}`]
                    ? "20px"
                    : "0px"
                }`,
              }}
            >
              {formik.touched[`${item?.name}`] &&
              formik.errors[`${item?.name}`] ? (
                <div>{formik.errors[`${item?.name}`]}*</div>
              ) : null}
            </div>
          </div>
        ))}

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
