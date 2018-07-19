import React, { Component } from 'react';
import { View, Text, Spinner } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import firebase, { database } from 'app/config/firebase';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import PhoneNumberVerification from 'app/components/PhoneNumberVerification/';
import Button from 'app/components/common/Button/';
import style from './style';

class SignUpStep2 extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleNumberWasVerified = this.handleNumberWasVerified.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
		};
	}

	/**
	 * Continue to the next step when the number was verified
	 * @param {String} phone_number The number that was verified
	 * @return {Void} 
	 */
	handleNumberWasVerified(phone_number) {
		this.props.setUserModel({phone_number});
		this.props.navigation.navigate('SignUpStep3');
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {office} = this.props;
		
		return (
			<ScreenWrapper>
				<Text style={[style.title]}>Verify your number</Text>
					<PhoneNumberVerification
						purpose="signup"
						officeId={office.id}
						onSuccess={this.handleNumberWasVerified}
						style={[{marginTop: 30}]}
					/>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStep2);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} options.office The office model
 * @return {Object}                  
 */
function mapStateToProps({office}) {
	return {
		office,
	};
}

/**
 * Map the store's action dispatcher to the component's props
 * @param  {Function} dispatch The dispatch function
 * @return {Object}           
 */
function mapDispatchToProps(dispatch) {
	return {
		setUserModel: (data) => dispatch(UserAction.setUserModel(data)),
	};
}