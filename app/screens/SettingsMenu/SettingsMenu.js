import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content, Right, Left, Icon, List, ListItem } from 'native-base';
import ScreenWrapper from 'app/components/common/ScreenWrapper';
import { auth } from 'app/config/firebase';
//import style from './style';

class SettingsMenu extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

        this.handleLogout = this.handleLogout.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
            items: [
                {id: 1, label: 'Terms and Conditions of Use', action: null},
                {id: 2, label: 'Log out', action: this.handleLogout},
            ]
		};
	}

    handleLogout() {
        auth().signOut().catch(err => console.warn(err));
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