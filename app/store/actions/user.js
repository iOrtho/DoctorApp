import { database } from 'app/config/firebase';

export default class User {

	static SET_USER_ID = 'SET_USER_ID';
	static SET_USER_MODEL = 'SET_USER_MODEL';
	static RESET_USER_MODEL = 'RESET_USER_MODEL';
	static SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
	
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

	/**
	 * Return the action to reset the user model on logout
	 * @param {Object} data The user model
	 * @return {Object} 
	 */
	static resetUserModel() {
		return {
			type: this.RESET_USER_MODEL,
		};
	}

	/**
	 * Return the action to mark the auth as checked
	 * @param {Object} data The user model
	 * @return {Object} 
	 */
	static setAuthChecked() {
		return {
			type: this.SET_AUTH_CHECKED,
		};
	}
}