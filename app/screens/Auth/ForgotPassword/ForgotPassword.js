import React, { Component } from 'react';
import { View, Text, Spinner } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import { auth, database } from 'app/config/firebase';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import PhoneNumberVerification from 'app/components/PhoneNumberVerification/';
import Button from 'app/components/common/Button/';
import style from '../style';

class ForgotPassword extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleResetPassword = this.handleResetPassword.bind(this);
		this.handleSendResetEmail = this.handleSendResetEmail.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			stage: 1,
			email: '',
			password: '',
			repeated: '',
			isSubmitting: false,
		};
	}

	/**
	 * Perform validation on the password before updating it
	 * @return {Void} 
	 */
	handleResetPassword() {
		const {password, repeated} = this.state;

		if(password.length < 6) {
			alert('Your password must be at least 6 characters.');
			return;
		}

		if(password != repeated) {
			alert('The passwords entered do not match.');
			return;
		}

		this.setState({isSubmitting: true});
		auth().currentUser.updatePassword(password)
			.then(() => {
				this.setState({isSubmitting: false});
				this.props.navigation.reset('Login');
			})
			.catch(err => {
				this.setState({isSubmitting: false});
				console.error(err);
			});
	}

	/*resetViaNumberSecurity() {
		this method is the preferred but cannot be used due to Firebase's restrictions
		I'll keep it here until I can find a way to incorporate it
		return (
			{stage == 1 && 
						<PhoneNumberVerification
							purpose="reset"
							officeId={office.id}
							onSuccess={() => this.setState({stage: 2})}
						/>}

					{stage == 2 &&
						<Form>
							<Text>Make sure that your password is at least 6 characters.</Text>
							<Item floatingLabel>
								<Label>New password</Label>
								<Input
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry={true}
									value={password}
									onChangeText={(password) => this.setState({password})}
								/>
							</Item>

							<Item floatingLabel>
								<Label>New password repeated</Label>
								<Input
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry={true}
									value={repeated}
									onChangeText={(repeated) => this.setState({repeated})}
								/>
							</Item>
							<Button
								text="Reset password"
								loading={isSubmitting}
								onPress={this.handleResetPassword}
							/>
						</Form>}
		);
	}*/

	/**
	 * Send a reset password link to the email provided
	 * @return {Void} 
	 */
	handleSendResetEmail() {
		const {email} = this.state;

		this.setState({isSubmitting: true});

		auth().sendPasswordResetEmail(email).then(() => {
			this.setState({isSubmitting: false});
			alert('A reset email was successfully sent to that address.');
		})
		.catch(err => {
			this.setState({isSubmitting: false});
			alert('No user with this email address could be found in our records.');
		});
	}
	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {stage, email, isSubmitting} = this.state;
		const {office} = this.props;
		const title = stage == 1 ? 'Verify your email' : 'Update your password';

		return (
			<ScreenWrapper>
					<Text style={[style.title]}>{title}</Text>
					<Form>
						<Item floatingLabel>
							<Label>Email</Label>
							<Input
								textContentType="emailAddress"
								autoCapitalize="none"
								autoCorrect={false}
								value={email}
								onChangeText={(email) => this.setState({email})}
							/>
						</Item>
						<Button
							text="Send reset link"
							loading={isSubmitting}
							onPress={this.handleSendResetEmail}
						/>
					</Form>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

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