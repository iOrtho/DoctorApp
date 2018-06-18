import { database } from 'app/config/firebase';

export default class User {

	static SET_USER_ID = 'SET_USER_ID';
	static SET_USER_MODEL = 'SET_USER_MODEL';
	
	/**
	 * Return the action to set the user ID
	 * @param {Number} id The user ID
	 * @return {Object} 
	 */
	static setUserId(id) {
		return {
			type: this.SET_USER_ID,
			id,
		};
	}

	/**
	 * Return the action to update a user's data
	 * @param {Object} data The user model
	 * @return {Object} 
	 */
	static setUserModel(data) {
		return {
			type: this.SET_USER_MODEL,
			data,
		};
	}
}