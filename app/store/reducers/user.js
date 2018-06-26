import UsersAction from '../actions/user';

const initialState = {
	id: null,
};

export default function user(state = initialState, action) {
	switch(action.type) { 

		case UsersAction.SET_USER_ID:
			return {...state, id: action.id };


		case UsersAction.SET_USER_MODEL:
			return { ...state, ...action.data };

		case UsersAction.RESET_USER_MODEL:
			return initialState;

		default:
			return state;
	}
}