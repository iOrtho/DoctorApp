import UsersAction from '../actions/user';

const initialState = {
	id: null,
	authIsChecked: false,
};

export default function user(state = initialState, action) {
	switch(action.type) { 

		case UsersAction.SET_USER_MODEL:
			return { ...state, ...action.data };

		case UsersAction.RESET_USER_MODEL:
			return initialState;

		case UsersAction.SET_AUTH_CHECKED:
			return { ...state, authIsChecked: true };

		default:
			return state;
	}
}