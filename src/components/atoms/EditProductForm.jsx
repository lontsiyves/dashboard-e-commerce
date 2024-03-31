import React, { useState } from "react";
import Select from "react-select";
import UploadFileInput from "./UploadFileInput";

const EditProductForm = ({ product, categories, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const [selectedCategory, setSelectedCategory] = useState(product.category);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    const { image, value } = file;
    setEditedProduct({ ...editedProduct, [image]: value });
    console.log('editedProduct: ',editedProduct)

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const categoryOptions = categories?.map((category) => ({
    value: category,
    label: category,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-md-6">
                  <div className="p-5">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="title">Titre:</label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="title"
                          name="title"
                          value={product.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Prix:</label>
                        <input
                          type="number"
                          className="form-control form-control-user"
                          id="price"
                          name="price"
                          value={product.price}
                          onChange={handleInputChange}
                        />
                      </div>

                      <label htmlFor="category">Categorie:</label>
                      <Select
                        isClearable
                        defaultValue={selectedCategory}
                        onChange={(selectOption) =>
                          setSelectedCategory(selectOption)
                        }
                        options={categoryOptions}
                        className="w-100 mx-0 mb-4"
                      />

                      <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                          id="description"
                          name="description"
                          rows="4"
                          cols="50"
                          value={product.description}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Upload File:</label>
                        <UploadFileInput onChange={handleFileChange} />
                        {selectedFile && (
                          <div>
                            <h3>Selected File:</h3>
                            <p>Name: {selectedFile.name}</p>
                          </div>
                        )}
                      </div>

                      <div className="my-3">
                        <button
                          className="btn btn-primary btn-user"
                          type="submit"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6">
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
  );
};

export default EditProductForm;
