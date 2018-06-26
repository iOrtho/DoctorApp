import React from 'react';
import { Animated, View, Text } from 'react-native';
import { 
	createBottomTabNavigator,
 	createSwitchNavigator,
 	createStackNavigator } from 'react-navigation';
import Chat from 'app/screens/Chat/';
import Home from 'app/screens/Home/';
import Medical from 'app/screens/Medical/';
import Login from 'app/screens/Auth/Login/';
import SettingsMenu from 'app/screens/SettingsMenu/';
import SignUp from 'app/screens/Auth/SignUp/';
import Icon from 'react-native-vector-icons/FontAwesome';
import styling from 'app/config/styling';

const AppTabs = createBottomTabNavigator(
	{
		Home,
		Medical,
		Chat,
		SettingsMenu,
	},
	{
		navigationOptions: ({navigation}) => ({
			tabBarIcon: ({focused, tintColor}) => {
				const { routeName } = navigation.state;
        		let iconName;

        		switch(routeName) {
        			case 'Chat':
        				iconName = 'user';
        				break;

        			case 'Medical':
        				iconName = 'thermometer-half';
        				break;

        			case 'SettingsMenu':
        				iconName = 'cog';
        				break;

        			default:
        				iconName = 'home';
        				break;
        		}

				return <Icon name={iconName} size={styling.tabIcon.size} color={tintColor} />
			},
		}),
		tabBarOptions: {
			activeTintColor: styling.color.main,
			inactiveTintColor: '#a7a6a6',
			style: {
				backgroundColor: 'white',
				height: 50,
				paddingTop: 7,
				marginBottom: 7,
				borderTopWidth: 0,
			    borderColor: 'rgba(0,0,0, .125)',
				shadowOffset: {
			    	width: 0,
			    	height: -15,
			    },
			    shadowRadius: 20,
			    shadowOpacity: .03,
			},
		},
		animationEnabled: true,
		swipeEnabled: false,
		configureTransition: (currentTransProps, nextTransProps) => ({
			timing: Animated.spring,
			tension: 1,
			friction: 35,
		})
	},
);

const AuthStack = createStackNavigator({
	Login,
	SignUp,
});

const AppNavigator = createSwitchNavigator(
	{
		App: AppTabs,
		Auth: AuthStack,
	},
	{
    	initialRouteName: 'Auth',
	}
);

export default AppNavigator;