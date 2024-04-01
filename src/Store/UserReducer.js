import {
    FAIL_REQUEST,
    MAKE_REQUEST,
    ADD_USER, 
    LOGIN_USER,
  } from "./ActionType";
  
  const initialstate = {
    loading: true,
    userlist: [],
    userobj: {},
    errmessage: "",
  };
  
  export const UserReducer = (state = initialstate, action) => {
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
      case ADD_USER:
        return {
          loading: false,
          errmessage: "",
          userobj: {},
        };
        case LOGIN_USER:
        return {
          loading: false,
          errmessage: "",
          userobj: {},
        };
      default:
        return state;
    }
  };
  