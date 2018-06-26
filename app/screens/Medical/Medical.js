import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import style from './style';

class Home extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();
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
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {users} = this.state;
		const {id} = this.props;

		return (
			<ScreenWrapper>
				<Text>This is the medical screen!</Text>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**
 * Map the redux store's state to the component's props
 * @param  {Number} options.user.id The ID of the user
 * @return {Object}                  
 */
function mapStateToProps({user: {id}}) {
	return {
		id,
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