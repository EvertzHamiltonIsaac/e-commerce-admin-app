import React, { useCallback, useState } from "react";
import Input from "../../components/app/input/Input";
import "./login/login-styles.css";
import LoginContainer from "../../components/pages/login/loginContainer/LoginContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { resetPassword } from "../../features/auth/authSlice";
import { useEffect } from "react";

const schemaForValidations = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm password is required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  

  const {isLoading, isSuccess, ResetPasswordPayload} = useSelector(state => state.auth);
  
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: schemaForValidations,
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
        dispatch(resetPassword({token, password: values.password})).then(() => navigate('/auth/sign-in'))
      }
    },
  });

  const InputsArray = [
    {
      Id: "password",
      type: "password",
      classNameInput: "form-control",
      labelValue: "Enter new password",
      name: "password",
    },
    {
      Id: "confirmPassword",
      type: "password",
      classNameInput: "form-control",
      labelValue: "Confirm password",
      name: "confirmPassword",
    },
  ];  
  return (
    <LoginContainer
      title="Reset Password"
      backgroundColor="#EEEEEE"
      rightMessageTitle="Reset your password"
      rightMessage="To reset your password, please enter your new password below. Make sure to choose a strong password that is at least 8 characters long and includes a combination of letters, numbers, and special characters."
      image="/Logo_CL.png"
      rightImage="/Logo_CL.png"
    >
      <form onSubmit={formik.handleSubmit}>
        <div
          className={`${
            isSuccess
              ? "alert alert-success error_invalid"
              : "none_error_invalid"
          }`}
          role="alert"
        >
          <h6>{ResetPasswordPayload?.message}</h6>
          <p>
            {typeof ResetPasswordPayload?.message === "string"
              ? "Password Updated"
              : ""}
          </p>
        </div>
        <p>Fill in both fields</p>
        {InputsArray.map((item, index) => (
          <div key={index}>
            <Input
              key={index}
              Id={item.Id}
              type={item.type}
              name={item.name}
              classNameInput={item.classNameInput}
              value={formik.values[`${item?.name}`]}
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
            value="Reset Password"
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
          />
        </div>
      </form>
    </LoginContainer>
  );
};

export default ResetPassword;
