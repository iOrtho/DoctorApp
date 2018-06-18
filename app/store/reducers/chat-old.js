import ChatAction from '../reducers/chat';

const initialState = {
	messages: [],
	meta: {
		isLoading: false,
		lastFetched: null,
		height: 0,
	}
};

export default function chat(state = initialState, action) {
	switch(action.type) {

		case ChatAction.START_FETCHING_MESSAGE:
			return {
				...state,
				meta: {
					...state.meta,
					isLoading: true
				}
			};

		case ChatAction.MESSAGE_RECEIVED: 
			return {
				...state,
				meta: {
					...state.meta,
					isLoading: false,
					lastFetched: Date.now(),
				}
			};

		case ChatAction.ADD_MESSAGE:
			return {
				...state,
				messages: [...state.messages, action.message]
			};

		case ChatAction.SET_CHAT_HISTORY:
			return {
				...state,
				messages: action.messages,
			};

		case ChatAction.SET_VIEW_HEIGHT:
			return {
				...state,
				meta: {
					...state.meta,
					height: action.height
				}
			};

		default:
			//console.log(action)
			return state;
	}
}