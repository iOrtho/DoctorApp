import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
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

		this.renderMapModal = this.renderMapModal.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			buttons: [
				{icon: 'phone', title: 'Call', onPress: null},
				{icon: 'map-marker', title: 'Directions', onPress: null, iconSize: 26},
				{icon: 'share', title: 'Share', onPress: null},
			],
			mapModal: true,
		};
	}

	openMapMenu() {
		const {} = this.props.office;

		ActionSheet.show({
			options: ['Open in Maps', 'Copy Address', 'Cancel'],
			cancelButtonIndex: 2,
		})
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
				{this.renderMapModal()}
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