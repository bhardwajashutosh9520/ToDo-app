import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import productReducer from './product';
// userReducer

export default combineReducers({
 product: productReducer,
 form: formReducer,
});
