import { database } from 'app/config/firebase';

export default class Chat {

	static SET_CHAT_MESSAGES = 'SET_CHAT_MESSAGES';
	static ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
	static UPDATE_CHAT_MESSAGE = 'UPDATE_CHAT_MESSAGE';
	static REMOVE_CHAT_MESSAGE = 'REMOVE_CHAT_MESSAGE';
	static START_FETCHING_MESSAGE = 'START_FETCHING_MESSAGE';
	static MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

	static asyncFetchMessages() {
		return (dispatch, getState) => {
			const {user: {id}, chat:{messages}} = getState();
			const Messages = database.collection('Messages');

			if(!id) return;

			dispatch(this.startFetchingMessage());

			// Messages that are sent
			Messages.where('Author.id','==', id).onSnapshot(snap => {
				handleNewMsgSnapshot(snap, dispatch);
			});

			// Messages that are received
			Messages.where('recipient','==', id).onSnapshot(snap => {
				handleNewMsgSnapshot(snap, dispatch);
			});
		};
	}

	/**
	 * Return an action to add a new message to the chat
	 * @param {Object} message The message to add
	 * @return {Object} 
	 */
	static addChatMessage(message) {
		return {
			type: this.ADD_CHAT_MESSAGE,
			message,
		};
	}

	/**
	 * Return an action to update a message
	 * @param {Object} message The message to update
	 * @return {Object} 
	 */
	static updateChatMessage(message) {
		return {
			type: this.UPDATE_CHAT_MESSAGE,
			message,
		};
	}

	/**
	 * Return an action to remove a message from the chat history
	 * @param {String} id The id of the message to remove
	 * @return {Object} 
	 */
	static removeChatMessage(id) {
		return {
			type: this.REMOVE_CHAT_MESSAGE,
			id,
		};
	}

	/**
	 * Return an action to set the chat history
	 * @param {Array} messages The new chat history
	 * @return {Object} 
	 */
	static setChatMessages(messages) {
		return {
			type: this.SET_CHAT_MESSAGES,
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
}

/**
 * Handle the dispatch of the new message based on the action triggered
 * @param  {Snapshot} snapshot The snapshot element
 * @param {Function} dispatch The dispatch function for actions
 * @return {Void}          
 */
function handleNewMsgSnapshot(snapshot, dispatch) {
	snapshot.docChanges().forEach(change => {
		const data = {
	 		...change.doc.data(), 
	 		id: change.doc.id,
	 	};

		if (change.type === 'added') { 
			dispatch(Chat.addChatMessage(data));
        }

        if (change.type === 'modified') {
			dispatch(Chat.updateChatMessage(data));
        }

        if (change.type === 'removed') {
        	dispatch(Chat.removeChatMessage(data.id));
        }
    });


	dispatch(Chat.messageReceived());
};