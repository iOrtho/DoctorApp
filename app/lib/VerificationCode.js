import axios from 'axios';

export default class VerificationCode {

	static TWILIO_VERIFY_API_KEY = '108RJQgtZIvDpAzK4hK1kFeQ3UCTslzo';
	static TWILIO_VERIFY_URL = 'https://api.authy.com/protected/json/phones/verification';
		
	/**
	 * Submit a request to send a verification code to the given number
	 * @param  {String} phone_number The number to send a text to
	 * @return {Void}              
	 */
	static sendTo(phone_number) {
		return new Promise((resolve, reject) => {
			const data = {
				phone_number,
				via: 'sms',
				country_code: 1,
				code_length: 5,
				locale: 'en',
			};

			axios.post(`${this.TWILIO_VERIFY_URL}/start`, data, {
				headers: { 'X-Authy-API-Key': this.TWILIO_VERIFY_API_KEY }
			}).then((res) => resolve())
			.catch((err) => {
				console.log(err);
				reject();
			});
		});
	}

	/**
	 * Send a request to verify that a verification code is good
	 * @param  {String} options.number The phone number
	 * @param  {String} options.code   The security code to check for
	 * @return {Void}                
	 */
	static verify({number, code}) {
		return new Promise((resolve, reject) => {
			const params = `?country_code=1&phone_number=${number}&verification_code=${code}`
			const res = axios.get(`${this.TWILIO_VERIFY_URL}/check${params}`, {
				headers: { 'X-Authy-API-Key': this.TWILIO_VERIFY_API_KEY }
			}).then((res) => {
				console.log(res);
				resolve();
			}).catch(err => {
				console.log(err);
				reject();
			});
		});
	}
}