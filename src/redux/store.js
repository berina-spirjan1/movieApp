import {createStore} from "redux";
import {reducer} from './reducer';

//we are holding our states in store
const store = createStore(reducer);

//not using store in braces because we are exporting it like default
export default store;
