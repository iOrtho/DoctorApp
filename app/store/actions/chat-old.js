import { database } from 'app/config/firebase';

export default class Chat {

	static ADD_MESSAGE = 'ADD_MESSAGE';
	static SET_CHAT_HISTORY = 'SET_CHAT_HISTORY';
	static SET_VIEW_HEIGHT = 'SET_VIEW_HEIGHT';
	static START_FETCHING_MESSAGE = 'START_FETCHING_MESSAGE';
	static MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

	/*static fetchMessages() {
		return (dispatch, getState) => {
			const {id} = getState().user;

			dispatch(this.startFetchingMessage());

			database.collection('Messages').where('Author.id','==', id)
			.onSnapshot(querySnapshot => {
				const data = [];
				querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));

				dispatch(this.messageReceived());
				dispatch(this.setChatHistory(data));
			});
		};
	}*/

	/**
	 * Return an action to set the chat history
	 * @param {Array} messages The new chat history
	 * @return {Object} 
	 */
	static setChatHistory(messages) {
		return {
			type: this.SET_CHAT_HISTORY,
			messages,
		};
	}

	/**
	 * Return an action to change the fetching status as started
	 * @return {Object} 
	 */
	static startFetchingMessage() {
		return {
			type: this.START_FETCHING_MESSAGE,
		};
	}

	/**
	 * Return an action to change the fetching status as completed
	 * @return {Object} 
	 */
	static messageReceived() {
		return {
			type: this.MESSAGE_RECEIVED,
		};
	}

	/**
	 * Return an action to set the height of the chat to scroll to
	 * @param {Number} height The height to scroll to
	 * @return {Object} 
	 */
	static setHeight(height) {
		return {
			type: this.SET_VIEW_HEIGHT,
			height,
		};
	}
}