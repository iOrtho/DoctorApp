import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';
import { auth } from 'app/config/firebase';
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

	handleUpdatePassword() {
		// ..
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
				<Form>
					<Item floatingLabel>
						<Label>Current password</Label>
						<Input
							textContentType="password"
							autoCapitalize="none"
							autoCorrect={false}
							value={current}
							onChangeText={(current) => this.setState({current})}
						/>
					</Item>
					<Item floatingLabel>
						<Label>New password</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							value={new_password}
							onChangeText={(new_password) => this.setState({new_password})}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Repeat new password</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
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

export default UpdatePassword;