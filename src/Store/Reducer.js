import {
  FAIL_REQUEST,
  GET_PRODUCT_LIST,
  MAKE_REQUEST,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT,
  GET_CATEGORIES_LIST,
} from "./ActionType";

const initialstate = {
  loading: true,
  productlist: [],
  categorielist: [],
  productobj: {},
  errmessage: "",
};

export const Reducer = (state = initialstate, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errmessage: action.payload,
      };
    case GET_PRODUCT_LIST:
      return {
        loading: false,
        errmessage: "",
        productlist: action.payload,
        productobj: {},
      };
      case GET_CATEGORIES_LIST:
        return {
          ...state,
          loading: false,
          errmessage: "",
          categorielist: action.payload,
        };

    case DELETE_PRODUCT:
      return {
        ...state,
        loading: false,
        errmessage: "",
      };
    case ADD_PRODUCT:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        loading: false,
        productobj: action.payload,
      };
    default:
      return state;
  }
};
