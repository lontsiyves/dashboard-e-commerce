import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = ({ onSubmit }) => {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("Requis"),
          password: Yup.string().required("Requis"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values); 
          setSubmitting(false);
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">Nom utilisateur</label>
            <Field
              type="text"
              name="username"
              id="username"
              className="form-control form-control-user"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <Field
              type="password"
              name="password"
              id="password"
              className="form-control form-control-user"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-user" type="submit">
              Enregistrer
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default LoginForm;
