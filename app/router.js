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
import ForgotPassword from 'app/screens/Auth/ForgotPassword/';
import SettingsMenu from 'app/screens/Settings/SettingsMenu/';
import AppSettings from 'app/screens/Settings/AppSettings/';
import SignUpStep1 from 'app/screens/Auth/SignUp/SignUpStep1/';
import SignUpStep2 from 'app/screens/Auth/SignUp/SignUpStep2/';
import SignUpStep3 from 'app/screens/Auth/SignUp/SignUpStep3/';
import UpdatePassword from 'app/screens/Settings/UpdatePassword/';
import Icon from 'react-native-vector-icons/FontAwesome';
import styling from 'app/config/styling';

const SettingsStack = createStackNavigator({
	SettingsMenu,
	UpdatePassword,
	AppSettings,
});

const AppTabs = createBottomTabNavigator(
	{
		Home,
		Chat,
		Settings: SettingsStack,
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

        			case 'Settings':
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
	SignUp: SignUpStep1,
	SignUpStep2,
	SignUpStep3,
	ForgotPassword,
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