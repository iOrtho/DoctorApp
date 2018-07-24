import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Content, Right, Left, Icon, List, ListItem } from 'native-base';
import ScreenWrapper from 'app/components/common/ScreenWrapper';
import { auth } from 'app/config/firebase';
//import style from './style';

class SettingsMenu extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

        this.navigateTo = this.navigateTo.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
            items: [
                {id: 4, label: 'My Account Details', action: () => this.navigateTo('AccountDetails')},
                {id: 6, label: 'Update Password', action: () => this.navigateTo('UpdatePassword')},
                {id: 3, label: 'Application Settings', action: () => this.navigateTo('AppSettings')},
                {id: 1, label: 'Terms and Conditions of Use', action: () => Linking.openURL('http://google.com')},
                {id: 2, label: 'Log out', action: () => this.handleLogout()},
            ]
		};
	}

	navigateTo(screen) {
		const {navigation} = this.props;
		navigation.navigate(screen);
	}

    handleLogout() {
        auth().signOut()
	        .then(() => setTimeout(() => this.props.navigation.navigate('Auth'), 500))
	        .catch(console.error);
    }

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
        const {items} = this.state;

		return (
			<ScreenWrapper>
                    <List>
                        {items.map(({id, label, action}) => {
                            return (
                                <ListItem key={id} onPress={action}>
                                    <Left><Text>{label}</Text></Left>
                                    <Right><Icon name="arrow-forward" /></Right>
                                </ListItem> 
                            );
                        })}
                    </List>     
			</ScreenWrapper>
		);
	}
}

export default SettingsMenu;