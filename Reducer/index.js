import { combineReducers } from "redux";
import {ADD_UPDATE_LOCATION} from "./types";


const addUpdateReducer = (state= {locations:{}}, action) =>{
	switch(action.type){
		default:
			return state;
	}
}


const reducer = combineReducers({
  addUpdateReducer,
});

export default reducer;