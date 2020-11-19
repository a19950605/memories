import { combineReducers } from 'redux';

import posts from './posts';
import { userRegisterReducer, userSigninReducer } from './user';

export const initialState = {
	userSignin: {
		userInfo: localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: null,
	},
};

export const reducers = combineReducers({
	posts,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
});
