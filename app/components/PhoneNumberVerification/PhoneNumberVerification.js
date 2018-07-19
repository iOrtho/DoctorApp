import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
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
		if(number.length == 10 && !number.includes(' ')) {
			let result = [];
			[...number].forEach((char, i) => {
				if(i == 3 || i == 6) result.push('-');
				result.push(char);
			});
			//console.log(result)
			return result.join('');
		}
		return number;
	}

	handleSendCode() {
		this.setState({isSubmitting: true});

		// Simulate async API call
		setTimeout(() => {
			this.setState({stage: 2, isSubmitting: false});
		}, 1500);
	}

	handleVerifyCode() {
		this.setState({isSubmitting: true});

		// Simulate async API call
		setTimeout(() => {
			this.setState({isSubmitting: false});
			this.props.onSuccess();
		}, 1500);
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
	onSuccess: PropTypes.func.isRequired,
	style: PropTypes.array,
};

PhoneNumberVerification.defaultProps = {
	style: [],
}

export default PhoneNumberVerification;