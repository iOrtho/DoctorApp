import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styling from 'app/config/styling';
import style from './style';

class QuickHelp extends Component {

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
			buttons: [
				{icon: 'phone', title: 'Call', onPress: null},
				{icon: 'map-marker', title: 'Directions', onPress: null, iconSize: 26},
				{icon: 'share', title: 'Share', onPress: null},
			]
		};
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {buttons} = this.state;
		const {style: customStyle} = this.props;

		return (
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
		);
	}
}

QuickHelp.propTypes = {
	style: PropTypes.array,
};

QuickHelp.defaultProps = {
	style: [],
};

export default connect(mapStateToProps, null)(QuickHelp);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} options.office The office model
 * @return {Object}                  
 */
function mapStateToProps({office}) {
	return {
		office,
	};
}