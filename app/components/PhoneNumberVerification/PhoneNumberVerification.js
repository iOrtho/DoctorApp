import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import VerificationCode from 'app/lib/VerificationCode';
import { database } from 'app/config/firebase';
import Button from 'app/components/common/Button';
import style from './style';

class PhoneNumberVerification extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleSendCode = this.handleSendCode.bind(this);
		this.handleVerifyCode = this.handleVerifyCode.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			number: '',
			code: '',
			stage: 1,
			isSubmitting: false,
		};
	}

	/**
	 * Attempt to format a phone number to be more readable
	 * @param  {String} number The phone number to format
	 * @return {String}        
	 */
	formatPhoneNumber(number) {
		if(number.length == 10 && !number.includes('-')) {
			let result = [];
			[...number].forEach((char, i) => {
				if(i == 3 || i == 6) result.push('-');
				result.push(char);
			});
			return result.join('');
		}
		return number;
	}

	/**
	 * Perform validation on the phone number before sending the code
	 * @return {Void} 
	 */
	handleSendCode() {
		const Users = database.collection('Users');
		const {officeId, purpose} = this.props;
		const {number} = this.state;
		this.setState({isSubmitting: true});

		Users.where('Office.id', '==', officeId)
			.where('phone_number', '==', number)
			.get()
			.then(snap => {
				if(purpose == 'signup' && snap.size == 1) {
					alert('This phone number is already in use.');
					this.setState({isSubmitting: false});
					return;
				}

				if(purpose == 'reset' && snap.size != 1) {
					alert('No user account with this phone number was found');
					this.setState({isSubmitting: false})
					return;
				}

				VerificationCode.sendTo(number)
				.then(() => this.setState({stage: 2, isSubmitting: false}))
				.catch(() => this.setState({isSubmitting: false}));
			});
	}

	/**
	 * Handle the verifying of the entered security code
	 * @return {Void} 
	 */
	handleVerifyCode() {
		const {number, code} = this.state;
		this.setState({isSubmitting: true});

		VerificationCode.verify({number, code})
		.then(() => {
			this.setState({isSubmitting: false});
			this.props.onSuccess(number);
		})
		.catch(() => {
			this.setState({isSubmitting: false});
			alert('The security code you entered does not match our records.');
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {number, isSubmitting, stage, code} = this.state;
		const {style: customStyle} = this.props;

		return (
			<Form style={[style.container, ...customStyle]}>
				{stage == 1 && 
					<View>
						<Item floatingLabel>
							<Label>Phone number</Label>
							<Input
								keyboardType="number-pad"
								textContentType="telephoneNumber"
								autoCorrect={false}
								value={this.formatPhoneNumber(number)}
								maxLength={12}
								onChangeText={(number) => this.setState({number})}
							/>
						</Item>
						<Button
							text="Send security code"
							loading={isSubmitting}
							onPress={this.handleSendCode}
						/>
					</View>}

				{stage == 2 && 
					<View>
						<Item style={style.code} floatingLabel>
							<Label>Security code</Label>
							<Input
								keyboardType="number-pad"
								autoCorrect={false}
								value={code}
								maxLength={5}
								onChangeText={(code) => this.setState({code})}
							/>
						</Item>
						<Button
							text="Validate"
							loading={isSubmitting}
							onPress={this.handleVerifyCode}
						/>
						<View style={{marginTop: 30}}>
							<Text>Did you accidently enter the wrong number? Press the button below to go back.</Text>
							<Button
								text="Change number"
								onPress={() => this.setState(this.getInitialState())}
								style={[{backgroundColor: 'orange'}]}
							/>
						</View>
					</View>}
			</Form>
		);
	}
}

PhoneNumberVerification.propTypes = {
	purpose: PropTypes.oneOf(['signup', 'reset']).isRequired,
	officeId: PropTypes.string.isRequired,
	onSuccess: PropTypes.func.isRequired,
	style: PropTypes.array,
};

PhoneNumberVerification.defaultProps = {
	style: [],
}

export default PhoneNumberVerification;