import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Form, Item, Input, Label } from 'native-base';
import UserAction from 'app/store/actions/user';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Button from 'app/components/common/Button/';
import { auth } from 'app/config/firebase';
import style from './style';

class Login extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleSignIn = this.handleSignIn.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			email: '',
			password: '',
			isSubmitting: false,
		};
	}

	/**
	 * Redirect the user to the app if already authenticated
	 */
	componentDidMount() {
		const {id, authIsChecked} = this.props.user;
		if(authIsChecked && id) {
			this.props.navigation.navigate('App');
		}
	}

	/**
	 * Redirect the user to the app if already authenticated
	 */
	componentDidUpdate() {
		const {id, authIsChecked} = this.props.user;
		if(authIsChecked && id) {
			this.props.navigation.navigate('App');
		}
	}

	/**
	 * Attempt to authenticate the user
	 * @return {Void} 
	 */
	handleSignIn() {
		const {email, password} = this.state;
		this.setState({isSubmitting: true});

		auth().signInWithEmailAndPassword(email, password).catch(({message}) => {
			this.setState({isSubmitting: false});
			alert(message);
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {isSubmitting, email, password} = this.state;
		const {authIsChecked} = this.props.user;

		return (
			<ScreenWrapper>
				<Form>
					<Text>Sign into your account</Text>
					<Item floatingLabel>
						<Label>Email</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							value={email}
							onChangeText={(email) => this.setState({email})}
						/>
					</Item>

					<Item floatingLabel>
						<Label>Password</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={false}
							secureTextEntry={true}
							value={password}
							onChangeText={(password) => this.setState({password})}
						/>
					</Item>

					<Button
						onPress={this.handleSignIn}
						loading={isSubmitting || !authIsChecked}
						text="Sign In"
					/>
				</Form>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} state.user The user's account model
 * @return {Object}                  
 */
function mapStateToProps({user}) {
	return {
		user,
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