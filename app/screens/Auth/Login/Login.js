import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import firebase, { database } from 'app/config/firebase';
import style from './style';

class Login extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.onSignIn = this.onSignIn.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			isSubmitting: false,
		};
	}

	/**
	 * Perform a request to authenticate a user anonymously
	 * @param  {Number} userId The user ID of the customer
	 * @return {Void}        
	 */
	onSignIn(userId) {
		const {navigation: authNav} = this.props;
		const Users = database.collection('Users');

		this.setState({isSubmitting: true});
		
		Users.doc(userId).get().then(doc => {
			this.setState({isSubmitting: false});

			if(doc.exists) {
				this.props.setUserModel({...doc.data(), id: userId});
				authNav.navigate('App');
				return;
			}

			alert('A user with this ID could NOT be found!');
		}).catch(err => {
			console.log(err);
			this.setState({isSubmitting: false});
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const uid = 'KHHNbjR2iooYQJpHyfSq';
		const {isSubmitting} = this.state;

		return (
			<ScreenWrapper>
				<View style={{marginTop: 50,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<Button
						key={uid}
						style={style.button}
						onPress={() => this.onSignIn(uid)}
					>
						{!isSubmitting && <Text>Sign In as a customer!</Text>}
						{isSubmitting && <Spinner color="#fff" />}
					</Button>
				</View>
			</ScreenWrapper>
		);
	}
}

export default connect(null, mapDispatchToProps)(Login);

/**
 * Map the store's action dispatcher to the component's props
 * @param  {Function} dispatch The dispatch function
 * @return {Object}           
 */
function mapDispatchToProps(dispatch) {
	return {
		setUserId: (id) => dispatch(UserAction.setUserId(id)),
		setUserModel: (data) => dispatch(UserAction.setUserModel(data)),
	};
}