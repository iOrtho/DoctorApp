import React, { Component } from 'react';
import { View, Text, Spinner } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import firebase, { database } from 'app/config/firebase';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Button from 'app/components/common/Button/';
import style from './style';

class SignUpStep1 extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleRegisterValidation = this.handleRegisterValidation.bind(this);
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
			error: '',
		};
	}

	/**
	 * Validate the email and password before attempting to create an account
	 * @return {Void} 
	 */
	handleRegisterValidation() {
		const Users = database.collection('Users');
		const {id} = this.props.office;
		const {email, password} = this.state;

		if(password.length < 6) {
			alert('For security reasons your password needs to be at least 6 characters!');
			return;
		}

		if(email.length < 7) {
			alert('Please enter a valid email address.');
			return;
		}

		this.setState({isSubmitting: true});
		Users.where('Office.id', '==', id)
			.where('email', '==', email)
			.limit(1)
			.get()
			.then(snapshot => {
				let alreadyExists = false;
				snapshot.forEach(doc => {
					if(doc.id) {
						alert('An account with this email already exists.');
						this.setState({isSubmitting: false});
						alreadyExists = true;
					}
				});

				if(!alreadyExists) {
				this.props.navigation.navigate('SignUpStep2'); //this.createUserAccount();
				}
			})
			.catch(err => {
				console.warn(err);
				this.setState({isSubmitting: false});
			});

		
	}

	/**
	 * Create the new auth and user account
	 * @return {Void} 
	 */
	createUserAccount() {
		const Users = database.collection('Users');
		const {email, password} = this.state;
		const {id, name} = this.props.office;

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(({message}) => {
			alert(message);
			this.setState({isSubmitting: false});
		});

		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				const {uid: auth_id, email} = user;
				const data = {
					auth_id,
					email,
					isEmailVerified: false,
					firstname: '',
					middlename: '',
					lastname: '',
					name: '',
					photo: '',
					phone_number: '',
					Office: { id, name },
					created_at: new Date(),
					updated_at: new Date(),
				};

				Users.add(data).then((doc) => {
					this.setState({isSubmitting: false});
					this.props.setUserModel({id: doc.id, ...data});
					this.props.navigation.navigate('App');
				})
				.catch(err => {
					console.warn(err);
					this.setState({isSubmitting: false});
				});
			}
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {email, password, number, isSubmitting} = this.state;

		return (
			<ScreenWrapper>
				<Text style={[style.title]}>Sign up today!</Text>
				<Form>
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
						onPress={this.handleRegisterValidation}
						loading={isSubmitting}
						text="Continue"
					/>
				</Form>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStep1);

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