import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, Linking, Alert, Clipboard } from 'react-native';
import PropTypes from 'prop-types';
import { Button, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppButton from 'app/components/common/Button';
import styling from 'app/config/styling';
import style from './style';

class QuickHelp extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.openMapMenu = this.openMapMenu.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			buttons: [
				{icon: 'phone', title: 'Call', onPress: null},
				{icon: 'map-marker', title: 'Directions', onPress: () => this.openMapMenu(), iconSize: 26},
				{icon: 'share', title: 'Share', onPress: null},
			],
		};
	}

	/**
	 * Display the menu of different options for the directions
	 * @return {Void} 
	 */
	openMapMenu() {
		const {address, city} = this.props.office.locations[0];
		const actions = ['open', 'copy', 'cancel'];
		const fullAddress = `${address}, ${city}`;

		ActionSheet.show({
			options: ['Open in Maps', 'Copy Address', 'Cancel'],
			cancelButtonIndex: 2,
			title: fullAddress,
		}, (index) => {
			this.handleMapAction(actions[index], index == 0 ? fullAddress : null);
		});
	}

	/**
	 * Handle the action to perform based on the choice in the map menu
	 * @param  {String} action The ID of the selected option
	 * @param  {String} target The target address
	 * @return {Void}        
	 */
	handleMapAction(action, target) {
		if(action == 'open') {
			(Platform.select({
				ios: () => Linking.openURL(`maps://app?daddr=${target}`),
				android: () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${target}`),
			}))();
		}else if(action == 'copy') {
			Clipboard.setString(target);
			Alert.alert('Success','The address was copied to the clipboard!');
		}
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {buttons} = this.state;
		const {style: customStyle} = this.props;

		return (
			<View>
				<View style={[style.container, ...customStyle]}>
					{buttons.map(({icon, title, onPress, iconSize}, i) => {
						return (
							<View key={i} style={[style.buttonWrapper]}>
								<Button style={[style.button]} onPress={onPress} bordered transparent>
									<Icon name={icon} color={styling.color.main} size={iconSize || 23} />
								</Button>
								<Text style={[style.buttonTitle]}>{title.toUpperCase()}</Text>
							</View>
						);
					})}
				</View>
			</View>
		);
	}
}

QuickHelp.propTypes = {
	office: PropTypes.object.isRequired,
	style: PropTypes.array,
};

QuickHelp.defaultProps = {
	style: [],
};

export default QuickHelp;