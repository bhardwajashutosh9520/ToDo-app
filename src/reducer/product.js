/* eslint-disable import/no-cycle */
import axios from "axios";
import store from "store";

// constants
export const SET_USER_DATA = "SET_USER_DATA";

// #actions

export function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}

export const getUserList = (data) => {
  return (dispatch, getState) => {
    return axios({
      url: `https://reqres.in/api/users?page=${data.page}`,
      method: "get",
      responseType: "json",
    }).then((response) => {
      if (data.page === 1) {
        dispatch(setUserData(response.data.data));
      } else {
        const prevData = getState().product.userData;
        prevData = prevData.concat(response.data.data);
        dispatch(setUserData(prevData));
      }
    });
  };
};

// initialize state and auth reducer
export const initialState = {
  userData: [],
};

// swicthing action
const ACTION_HANDLERS = {
  [SET_USER_DATA]: (state, action) => {
    return {
      ...state,
      userData: action.payload,
    };
  },
};

/**
 * @type {object} status
 */
// upload profile pic
export default function productReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
