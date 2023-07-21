import { combineReducers } from "redux";
import { csrfFetch } from "./csrf";

const SET_SESSION_USER = "session/setSessionUser";
const CLEAR_SESSION_USER = "session/clearSessionUser";


const setSessionUser = (user) => ({
    type: SET_SESSION_USER,
    payload: user,
});

const clearSessionUser = () => ({
    type: CLEAR_SESSION_USER,
});

export const login = ( user ) => async (dispatch) => {
    const { credential, password } = user;

    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential, password })
    });

    if (res.ok) {
        const userData = await res.json();
        dispatch(setSessionUser(userData.user))
        return res;
    } else {
        const errors = await res.json();
        return errors
    }
};

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");

    if (res.ok) {
        const userData = await res.json();
        dispatch(setSessionUser(userData.user))
        return res;
    } else {
        const errors = await res.json();
        return errors
    }
}


const initialState = {
    user: null,
  };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SESSION_USER:
        return {
          ...state,
          user: action.payload,
        };
      case CLEAR_SESSION_USER:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };


  export default sessionReducer;
