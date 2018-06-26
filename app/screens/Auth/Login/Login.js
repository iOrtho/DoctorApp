import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Button from 'app/components/common/Button/';
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
		const {authIsChecked} = this.props.user;

		return (
			<ScreenWrapper>
				<View style={{marginTop: 50,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					
					<Button
						style={[style.button]}
						onPress={() => this.onSignIn(uid)}
						loading={!authIsChecked}
						text="Sign in as a customer!"
					>
					</Button>
				</View>
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
		setUserId: (id) => dispatch(UserAction.setUserId(id)),
		setUserModel: (data) => dispatch(UserAction.setUserModel(data)),
	};
}