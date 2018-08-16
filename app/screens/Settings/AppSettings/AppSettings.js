import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Content, Right, Left, Body, Icon, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { auth, database } from 'app/config/firebase';
import Permissions from 'app/lib/Permissions';
import ScreenWrapper from 'app/components/common/ScreenWrapper';
import styling from 'app/config/styling';
import style from '../style';

class AppSettings extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleNotificationChange = this.handleNotificationChange.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
		};
	}

	async handleNotificationChange(activate) {
		if(activate) {
			Permissions.requestNotifications(this.props.user.id);
			return;
		}

		const Users = database.collection('Users');
		const {id} = this.props.user;
		Users.doc(id).update({
			"permissions.notifications": false,
			updated_at: new Date()
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {notifications} = this.props.user.permissions;

		return (
			<ScreenWrapper>
				<List>
					<ListItem>
						<Left>
							<Switch
								value={notifications}
								onTintColor={styling.color.main}
								tintColor={styling.color.main} 
								onValueChange={this.handleNotificationChange}
							/>
						</Left>
						<Body>
							<Text>Allow notifications.</Text>
						</Body>
					</ListItem>
				</List>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps)(AppSettings);

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