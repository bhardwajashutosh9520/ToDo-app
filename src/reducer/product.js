/* eslint-disable import/no-cycle */
import axios from 'axios';
import store from 'store';

// constants
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_USER_DATA = 'SET_USER_DATA';

// #actions

/**
 * @type {boolean} status
 */
// function to enable loader
export function setProductList(data) {
 return {
  type: SET_PRODUCT_LIST,
  payload: data,
 };
}

export function setUserData(data) {
 return {
  type: SET_USER_DATA,
  payload: data,
 };
}

/**
 * @type {object} status
 */
// gets the user's profile data
export const startLogin = (data) => {
 return (dispatch) => {
  return axios({
   url: 'https://apiuat.mccoymart.com/b2b/signin',
   headers: {
    'Content-Type': 'application/json',
   },
   method: 'post',
   data: {
    action: 'other',
    device_type: '2',
    username: data.username,
    password: data.password,
   },
   responseType: 'json',
  }).then((response) => {
   store.set('User', response.data.data);
   window.location.href = '/productList';
  });
 };
};

export const getProductList = () => {
 const userData = store.get('User');
 const token = userData.access_token;
 return (dispatch) => {
  return axios({
   url: 'https://apiuat.mccoymart.com/b2b/getofferproducts',
   headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
   },
   method: 'post',
   data: {
    module_type: 'under199',
    source: 2,
   },
   responseType: 'json',
  }).then((response) => {
   store.set('ProductList', response.data.data);
  });
 };
};

export const getProductDetails = (id) => {
 const userData = store.get('User');
 const token = userData.access_token;
 return (dispatch) => {
  return axios({
   url: 'https://apiuat.mccoymart.com/b2b/productdetail',
   headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
   },
   method: 'post',
   data: {
    product_id: id,
    pack_id: 37, // 0 else is pack then pack id
    source: 2,
   },
   responseType: 'json',
  }).then((response) => {
   store.set('ProductDetail', response.data.data);
  });
 };
};

// initialize state and auth reducer
export const initialState = {
 productList: [],
 userData: {},
};

// swicthing action
const ACTION_HANDLERS = {
 [SET_PRODUCT_LIST]: (state, action) => {
  return {
   ...state,
   productList: action.payload,
  };
 },
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
