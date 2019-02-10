import {createStore, combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
const reducers = combineReducers ({
  form: formReducer
});

const store = createStore(reducers);
export default store;
