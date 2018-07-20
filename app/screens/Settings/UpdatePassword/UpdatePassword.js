import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';
import { connect } from 'react-redux';
import firebase, { auth } from 'app/config/firebase';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Button from 'app/components/common/Button/';
import style from './style';

class UpdatePassword extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			current: '',
			new_password: '',
			new_repeated: '',
			isSubmitting: false,
		};
	}

	/**
	 * Validate the input then send the requests to update a password
	 * @return {Void} 
	 */
	handleUpdatePassword() {
		const {email} = this.props.user;
		const {current: password, new_password, new_repeated} = this.state;
		const credential = firebase.auth.EmailAuthProvider.credential(email, password);
		const user = auth().currentUser;

		if(password.length < 6) {
			alert('Please enter your current password.');
			return;
		};

		if(new_password.length < 6) {
			alert('Make sure your new password is at least 6 characters.');
			return;
		};

		if(new_password != new_repeated) {
			alert('The new passwords you entered do not match.');
			return;
		};

		this.setState({isSubmitting: true});

		user.reauthenticateAndRetrieveDataWithCredential(credential)
		.then(() => {
			user.updatePassword(new_password).then(() => {
				alert('Your password was successfully updated.');
				this.setState(this.getInitialState());
			})
			.catch(err => {
				this.setState({isSubmitting: false});
				console.log(err);
			});
		})
		.catch(err => {
			alert('The current password you provided is incorrect.');
			this.setState({isSubmitting: false});
			console.log(err);
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {current, new_password, new_repeated, isSubmitting} = this.state;

		return (
			<ScreenWrapper>
				<Text style={[style.title]}>Update password</Text>
				<Text style={[style.center]}>Make sure that your new password is at least 6 characters long for security.</Text>
				<Form>
					<Item floatingLabel>
						<Label>Current password</Label>
						<Input
							textContentType="password"
							autoCapitalize="none"
							autoCorrect={false}
							secureTextEntry={true}
							value={current}
							onChangeText={(current) => this.setState({current})}
						/>
					</Item>
					<Item floatingLabel>
						<Label>New password</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							secureTextEntry={true}
							value={new_password}
							onChangeText={(new_password) => this.setState({new_password})}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Repeated new password</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							secureTextEntry={true}
							value={new_repeated}
							onChangeText={(new_repeated) => this.setState({new_repeated})}
						/>
					</Item>
					<Button
						text="Update my password"
						loading={isSubmitting}
						onPress={this.handleUpdatePassword}
					/>
				</Form>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, null)(UpdatePassword);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} options.user The user model
 * @return {Object}                  
 */
function mapStateToProps({user}) {
	return {
		user,
	};
}