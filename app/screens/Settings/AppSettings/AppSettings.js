import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { Content, Right, Left, Icon, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { auth, database } from 'app/config/firebase';
import ScreenWrapper from 'app/components/common/ScreenWrapper';
import style from '../style';

class AppSettings extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.askForNotifications = this.askForNotifications.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
		};
	}

	componentDidMount() {
		if(! this.props.user.permissions.notifications) {
			this.askForNotifications();
		}
	}

	async askForNotifications() {
		const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		
		if(status != 'granted') {
			alert('Please enable notifications, they are essential for the proper functioning of the app.');
			return;
		}

		const token = await Notifications.getExpoPushTokenAsync();
		const Users = database.collection('Users');
		const {id} = this.props.user;

		Users.doc(id).update({
			"permissions.notifications": status == 'granted',
			"permissions.notifications_token": token,
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
							<Switch value={notifications} />
						</Left>
						<Right>
							<Text>Notifications</Text>
						</Right>
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