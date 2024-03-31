import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";

export default function AddProductForm({ categories, onSubmit }) {
  const [category, setSelectedCategory] = useState(null);

  const categoryOptions = categories?.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
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
        console.log("values: ",values)
        onSubmit(values);
        resetForm();
      }}
    >
      {({ setFieldValue, isSubmitting, submitForm, isValid, dirty, errors, values }) => (
        <Form>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    <div>
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

                        <label htmlFor="category">Categorie:</label>
                        <Select
                          isClearable
                          id="category"
                          name="category"
                          placeholder="Select a category"
                          options={categoryOptions}
                          onChange={(selectOption) =>
                            setSelectedCategory(selectOption)
                          }
                          value={category}
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
                        <div className="form-group">
                          <label htmlFor="image">Image:</label>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              ); // Set the image value
                            }}
                          />
                          <ErrorMessage
                            name="image"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <button 
                          disabled={!isValid || !dirty || isSubmitting}
                          type='submit'
                          fluidsize='large'
                          color='teal'
                          content='Submit'
                          onClick={submitForm}
                        >Add Product</button>
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
}
