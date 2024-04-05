import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loading from "../../components/atoms/Loading";

import * as Yup from "yup";

const LoginForm = ({ onSubmit,loading }) => {
  return (
    <div>
      <h1>Connexion</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("Ce champ est obligatoire"),
          password: Yup.string().required("Ce champ est obligatoire"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          {loading ? (
            <Loading
              type={"spokes"}
              color={"#4e73df"}
              width={"20%"}
              height={"20%"}
              className={"4e73df"}
            />
          ) : null}
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
              Se connecter
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default LoginForm;
