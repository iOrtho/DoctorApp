export default class Office {
	static SET_OFFICE_MODEL = 'SET_OFFICE_MODEL';

	/**
	 * Return an action to update the office's data
	 * @param {Object} data The new data
	 */
	static setOfficeModel(data) {
		return {
			type: this.SET_OFFICE_MODEL,
			data,
		};
	}
}