import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginUser } from "../../Store/Action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    dispatch(LoginUser(values));
    //  navigate("/dashboad");

    setSubmitting(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  return (
    <div className="user">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Nom utilisateur</label>
              <Field
                type="text"
                name="username"
                className="form-control form-control-user"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de Passe</label>
              <Field
                type="password"
                name="password"
                className="form-control form-control-user"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              className="btn btn-primary btn-user"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
