import ChatAction from '../actions/chat';

const initialState = {
	messages: [],
	meta: {
		isLoading: false,
		lastFetched: null,
		height: 0,
	},
};

/**
 * Modify the messages array to sort it by date
 * @param  {Array} messages The messages to sort
 * @return {Array}          
 */
function sortByDate(messages) {
	const sorted = [...messages];
	sorted.sort((first, second) => {
		const a = new Date(first.created_at.seconds);
		const b = new Date(second.created_at.seconds);

		return a - b;
	});

	return sorted;
}

export default function chat(state = initialState, action) {
	switch(action.type) { 

		case ChatAction.SET_CHAT_MESSAGES:
			return {...state, messages: sortByDate(action.messages) };

		case ChatAction.UPDATE_CHAT_MESSAGE:
			return {
				...state, 
				messages: state.messages.map(message => {
					if(message.id == action.message.id)	{
						return action.message;
					}

					return message;
				}),
			};

		case ChatAction.REMOVE_CHAT_MESSAGE:
			return {
				...state,
				messages: state.messages.filter(({id}) => id != action.id),
			};

		case ChatAction.ADD_CHAT_MESSAGE:
			return {
				...state,
				messages: sortByDate([...state.messages, action.message ])
			};

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

		default:
			return state;
	}
}