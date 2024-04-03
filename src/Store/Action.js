import {
  ADD_PRODUCT,
  ADD_USER,
  DELETE_PRODUCT,
  FAIL_REQUEST,
  GET_CATEGORIES_LIST,
  GET_PRODUCT,
  GET_PRODUCT_LIST,
  LOGIN_USER,
  MAKE_REQUEST,
  UPDATE_PRODUCT,
} from "./ActionType";
import { ErrorNotify, SuccessNotify } from "../lib/notify";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

export const deleteProduct = () => {
  return {
    type: DELETE_PRODUCT,
  };
};
export const addProduct = () => {
  return {
    type: ADD_PRODUCT,
  };
};

export const updateProduct = () => {
  return {
    type: UPDATE_PRODUCT,
  };
};

export const adduser = () => {
  return {
    type: ADD_USER,
  };
};
export const loginuser = () => {
  return {
    type: LOGIN_USER,
  };
};
export const getProduct = (data) => {
  return {
    type: GET_PRODUCT,
    payload: data,
  };
};

export const getProductList = (data) => {
  return {
    type: GET_PRODUCT_LIST,
    payload: data,
  };
};

export const getCategoriesList = (data) => {
  return {
    type: GET_CATEGORIES_LIST,
    payload: data,
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch(makeRequest());
    try {
      let data;

      if (
        getState().products?.productlist &&
        getState().products?.productlist?.length > 0
      ) {
        const response = await getState().products.productlist;
        data = response;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products`
        );
        data = await response.json();
      }

      dispatch(getProductList(data));
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const sortByPrice = (ordre) => {
  return async (dispatch, getState) => {
    dispatch(makeRequest());
    try {
      let data;

      if (
        getState().products?.productlist &&
        getState().products?.productlist?.length > 0
      ) {
        const response = await getState().products.productlist;
        data = response;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products`
        );
        data = await response.json();
      }

      if (ordre === "ASC") {
        const sorted = [...data].sort((a, b) => (a.price > b.price ? 1 : -1));
        dispatch(getProductList(sorted));
      } else {
        const sorted = [...data].sort((a, b) => (b.price > a.price ? 1 : -1));
        dispatch(getProductList(sorted));
      }
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const sortByRating = (ordre) => {
  return async (dispatch, getState) => {
    dispatch(makeRequest());

    try {
      let data;

      if (
        getState().products?.productlist &&
        getState().products?.productlist?.length > 0
      ) {
        const response = await getState().products.productlist;
        data = response;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products`
        );
        data = await response.json();
      }
      if (ordre === "ASC") {
        const sorted = [...data].sort((a, b) =>
          a.rating.rate > b.rating.rate ? 1 : -1
        );
        dispatch(getProductList(sorted));
      } else {
        const sorted = [...data].sort((a, b) =>
          b.rating.rate > a.rating.rate ? 1 : -1
        );
        dispatch(getProductList(sorted));
      }
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const sortName = (ordre) => {
  return async (dispatch, getState) => {
    dispatch(makeRequest());

    try {
      let data;

      if (
        getState().products?.productlist &&
        getState().products?.productlist?.length > 0
      ) {
        const response = await getState().products.productlist;
        data = response;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products`
        );
        data = await response.json();
      }
      if (ordre === "ASC") {
        const sorted = [...data].sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        dispatch(getProductList(sorted));
      } else {
        const sorted = [...data].sort((a, b) =>
          b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        );
        dispatch(getProductList(sorted));
      }
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const fetchcategories = () => {
  return async (dispatch, getState) => {
    dispatch(makeRequest());

    try {
      let data;

      if (
        getState().products?.categorielist &&
        getState().products?.categorielist?.length > 0
      ) {
        const response = await getState().products.categorielist;
        dispatch(getCategoriesList(response));
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/categories`
        );
        data = await response.json();

        const categoryOptions = data.map((category) => ({
          value: category,
          label: category,
        }));

        dispatch(getCategoriesList(categoryOptions));
      }
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const fetchProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch(makeRequest());
    /*   try {
      let data;
      if (
        getState().products?.productlist &&
        getState().products?.productlist?.length > 0
      ) {
        const response = await getState().products.productlist;
        //data = response;
        if(response.length > 0 ) {
          const sorted = await response.find((item) => item.id === id);
          dispatch(getProduct(sorted));
        }
       
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/${id}`
        );
        data = await response.json();
        dispatch(getProduct(data));
      }
    } catch (error) {
      dispatch(failRequest(error.message));
    }
*/

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${id}`
      );
      const data = await response.json();
      dispatch(getProduct(data));
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const removeProduct = (productId) => {
  return async (dispatch) => {
    dispatch(deleteProduct());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(deleteProduct(data));
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const FunctionAddProduct = (data) => {
  const { title, description, price, category, image } = data;

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/`,
        {
          method: "POST",
          body: JSON.stringify({
            title,
            price,
            description,
            image,
            category,
          }),
        }
      );
      const data = await response.json();
      dispatch(addProduct());
      SuccessNotify("Ajouter avec succès");
    } catch (error) {
      ErrorNotify(`${error.message}`);
    }
  };
};

export const FunctionUpdateProduct = (product, id) => {
  const { title, price, description, image, category } = product;

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title,
            price,
            description,
            image,
            category,
          }),
        }
      );
      //  const data = await response.json();
      dispatch(updateProduct());
      SuccessNotify("Mise à jour  avec succès");
    } catch (error) {
      ErrorNotify(`${error.message}`);
    }
  };
};

/*
export const AddUser = (user) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          username: user.username,
          password: user.password,
          name: user.name,
          address: user.address,
          phone: user.phone,
        }),
      });
      const data = await response.json();
      console.log("user: ", data);
      dispatch(adduser());
      SuccessNotify("Ajouter avec succès");
    } catch (error) {
      ErrorNotify(`${error.message}`);
    }
  };
};*/

export const LoginUser = (user) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            username: `${user.username}`,
            password : `${user.password}`,
          }),
        }
      );
      const data = await response.json();
      dispatch(loginuser());
      SuccessNotify("Login avec succès");
    } catch (error) {
      ErrorNotify(`${error.message}`);
    }
  };
};
