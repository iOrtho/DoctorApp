import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Form, Item, Input, Label } from 'native-base';
import UserAction from 'app/store/actions/user';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Button from 'app/components/common/Button/';
import Link from 'app/components/common/Link/';
import { database, auth } from 'app/config/firebase';
import style from '../style';

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
		const Users = database.collection('Users');
		const {email, password} = this.state;
		const {office} = this.props; 		

		this.setState({isSubmitting: true});

		Users.where('Office.id', '==', office.id).where('email', '==', email).limit(1).get()
			.then(snapshot => {
				let userExist;
				snapshot.forEach(doc => userExist = Boolean(doc.id));

				if(!userExist) {
					this.setState({isSubmitting: false});
					alert('No user with this email address could be found at this practice!');
					return;
				}

				auth().signInWithEmailAndPassword(email, password).catch(({message}) => {
					this.setState({isSubmitting: false});
					alert(message);
				});
			})
			.catch(err => {
				console.error(err);
				this.setState({isSubmitting: false});
			});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {isSubmitting, email, password} = this.state;
		const {navigation, user: {authIsChecked}} = this.props;

		return (
			<ScreenWrapper style={[{height: '100%'}]}>
				<Form>
					<Text style={[style.title]}>Sign into your account</Text>
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
					<Button
						text="Sign Up"
						onPress={() => navigation.navigate('SignUp')}
					/>
				</Form>
				<Link onPress={() => navigation.navigate('ForgotPassword')} style={[style.forgotPasswordLink]}>
					Forgot your password? Press here to reset it.
				</Link>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} state.user The user's account model
 * @param  {Object} state.office The practice's office model
 * @return {Object}                  
 */
function mapStateToProps({user, office}) {
	return {
		user,
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