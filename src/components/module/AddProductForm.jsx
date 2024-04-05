import React, { useState } from "react";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProductForm = ({ categories, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.value
  );

  const defaultCategoryValue = {
    value: selectedCategory,
    label: selectedCategory,
  };
  return (
    <Formik
      initialValues={{
        title: "",
        category: "",
        description: "",
        image: "",
        price: 0,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Ce champ est obligatoire"),
        category: Yup.string(),
        description: Yup.string().required("Ce champ est obligatoire"),
        image: Yup.string().required("Ce champ est obligatoire"),
        price: Yup.number()
          .positive("Doit être un nombre positif")
          .required("Ce champ est obligatoire"),
      })}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({
        setFieldValue,
        isSubmitting,
        submitForm,
        isValid,
        dirty,
        errors,
        values,
      }) => (
        <Form>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="col">
                        <div className="p-5">
                          <div className="form-group">
                            <label htmlFor="title">Titre:</label>
                            <Field
                              type="text"
                              id="title"
                              name="title"
                              className="form-control form-control-user"
                            />
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <Field
                              type="number"
                              id="price"
                              name="price"
                              className="form-control form-control-user"
                            />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <label htmlFor="category">Categorie:</label>
                          <Select
                            isClearable
                            defaultValue={defaultCategoryValue}
                            onChange={(selectOption) =>
                              setSelectedCategory(selectOption)
                            }
                            options={categories}
                            value={selectedCategory}
                            className="w-100 mx-0 mb-4"
                          />

                          <div className="form-group">
                            <label htmlFor="description">Description:</label>

                            <Field
                              as="textarea"
                              id="description"
                              name="description"
                              className="form-control form-control-user"
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="image">Image:</label>
                            <input
                              id="image"
                              name="image"
                              type="file"
                              onChange={(event) => {
                                if (event.target.files.length > 0) {
                                  const lien = URL.createObjectURL(
                                    event.target.files[0]
                                  );
                                  setFieldValue("image", lien);
                                }
                              }}
                            />
                            <ErrorMessage
                              name="image"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="my-3">
                            <button
                              className="btn btn-primary btn-user"
                              loading={isSubmitting}
                              disabled={!isValid || !dirty || isSubmitting}
                              type="submit"
                              fluidsize="large"
                              color="teal"
                              content="Submit"
                              onClick={submitForm}
                            >
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
