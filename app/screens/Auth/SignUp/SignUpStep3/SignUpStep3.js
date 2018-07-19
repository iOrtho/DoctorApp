import React, { Component } from 'react';
import { View, Text, Spinner } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import firebase, { database } from 'app/config/firebase';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Button from 'app/components/common/Button/';
import style from './style';

class SignUpStep3 extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleCreateUserAccount = this.handleCreateUserAccount.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			firstname: '',
			middlename: '',
			lastname: '',
			photo: '',
			isSubmitting: false,
			error: '',
		};
	}

	/**
	 * Validate the inputs before creating the user account
	 * @return {Void} 
	 */
	handleRegisterValidation() {
		const {firstname, lastname} = this.state;

		if(firstname.length < 2) {
			alert('Please enter your first name.');
			return;
		}

		if(lastname.length < 2) {
			alert('Please enter your last name.');
			return;
		}

		this.handleCreateUserAccount();
	}

	/**
	 * Create the new auth and user account
	 * @return {Void} 
	 */
	handleCreateUserAccount() {
		const Users = database.collection('Users');
		const {firstname, middlename, lastname, photo} = this.state;
		const {email, password, phone_number} = this.props.user;
		const {id, name} = this.props.office;

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(({message}) => {
			alert(message);
			this.setState({isSubmitting: false});
		});

		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				const {uid: auth_id} = user;
				const data = {
					auth_id,
					email,
					firstname,
					middlename,
					lastname,
					photo,
					phone_number,
					name: `${firstname} ${middlename} ${lastname}`,
					isEmailVerified: false,
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
		const {firstname, middlename, lastname, isSubmitting} = this.state;

		return (
			<ScreenWrapper>
				<Text style={[style.title]}>Almost done...</Text>
				<Form>
					<Item floatingLabel>
						<Label>First name</Label>
						<Input
							autoCorrect={false}
							value={firstname}
							onChangeText={(firstname) => this.setState({firstname})}
						/>
					</Item>
					<Item>
						<Label>Middle name</Label>
						<Input
							autoCorrect={false}
							placeholder="Optional"
							value={middlename}
							onChangeText={(middlename) => this.setState({middlename})}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Last name</Label>
						<Input
							autoCorrect={false}
							value={lastname}
							onChangeText={(lastname) => this.setState({lastname})}
						/>
					</Item>

					<Button
						onPress={this.handleRegisterValidation}
						loading={isSubmitting}
						text="Sign Up"
					/>
				</Form>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStep3);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} options.office The office model
 * @param {Object} options.user The user data stored for registration
 * @return {Object}                  
 */
function mapStateToProps({office, user}) {
	return {
		office,
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