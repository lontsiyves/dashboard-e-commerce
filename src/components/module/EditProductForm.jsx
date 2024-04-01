import React, { useState } from "react";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditProductForm = ({ product, categories, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState(product.category);

  const defaultCategoryValue = {
    value: selectedCategory,
    label: selectedCategory,
  };

  const { title, description, price, category, image } = product;

  return (
    <Formik
      initialValues={{
        title,
        description,
        price,
        category,
        image,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Requis"),
        category: Yup.string().required("Requis"),
        description: Yup.string().required("Requis"),
        image: Yup.mixed().required("Requis"),
        price: Yup.number()
          .required("Requis")
          .positive("Doit être un nombre positif"),
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
                      <div className="col-lg-6">
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
                              type="submit"
                            >
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-5">
                          <img
                            width={300}
                            height={300}
                            loading="eager|lazy"
                            src={product.image}
                            className="rounded mx-auto d-block"
                            alt={product.title}
                          />
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

export default EditProductForm;
