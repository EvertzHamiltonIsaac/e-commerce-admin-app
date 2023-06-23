import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Input from "../../../components/app/input/Input";
import LoginContainer from "../../../components/pages/login/loginContainer/LoginContainer";
import { signIn } from "../../../features/auth/authSlice";
import "./login-styles.css";
import Swal from "sweetalert2";

// const [formData, setFormData] = useState({ email: '', password: '' });

//! Another Logic Without Libraries Formik and Yup for validations.
// const handleFormData = (option, data) => {
//   const writeInFormData = {
//     email: () => setFormData({...formData, email: data}),
//     password: () => setFormData({...formData, password: data}),
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

// const {user, isLoading, isSuccess, isError} = useSelector((state) => state.auth);

// useEffect(() => {
//   if(user || isSuccess){
//     navigate('/');
//   }
//   // else {
//   //   Swal.fire({
//   //     icon: 'error',
//   //     title: 'Oops...',
//   //     text: 'Something went wrong!',
//   //   });
//   // }
// }, [user, isLoading, isSuccess, isError])

const schemaForValidations = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = "Sign in to take advantage of all the management tools and functions available for your e-commerce.";

  const { user, isLoading, isSuccess, isError } = useSelector(
    (state) => state.auth
  );

  const handleOnLogin = () => {
    if (localStorage.getItem("sessionToken")) {
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaForValidations,
    onSubmit: async (values) => {
      await dispatch(signIn(values));
      handleOnLogin();
    },
  });

  const InputsArray = [
    {
      Id: "email",
      type: "email",
      name: "email",
      classNameInput: "form-control",
      labelValue: "Enter your email address",
      value: formik.values.email,
    },
    {
      Id: "password",
      type: "password",
      classNameInput: "form-control",
      labelValue: "Enter your password",
      name: "password",
      value: formik.values.password,
    },
  ];

  return (
    <LoginContainer
      title="Sign In"
      backgroundColor="#EEEEEE"
      rightMessageTitle="Welcome to Ginger Admin"
      rightMessage={message}
      image="/logo_column.png"
      rightImage="/logo_column.png"
    >
      <form onSubmit={formik.handleSubmit}>
        <p>Please login to your account</p>
        {InputsArray.map((item, index) => (
          <div key={index}>
            <Input
              Id={item.Id}
              type={item.type}
              name={item.name}
              classNameInput={item.classNameInput}
              labelValue={item.labelValue}
              onChange={formik.handleChange(`${item?.name}`)}
              value={item.value}
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
          <button
            type="submit"
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 p-2 d-flex justify-content-center align-items-center gap-1"
          >
            {
              isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            }
            <span>Login</span>
          </button>
          <Link to={"/auth/forgot-password"} className="text-muted">
            Forgot password?
          </Link>
        </div>
      </form>
      {/* <div className="d-flex align-items-center justify-content-center pb-1">
        <p className="mb-0 me-2">Don't have an account?</p>
        <Link to={""} style={{ color: "var(--color-blue-main)" }}>
          Create new
        </Link>
      </div> */}
    </LoginContainer>
  );
};

export default Login;
