import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const ScreenWrapper = ({style: customStyle, children}) => {
	
	return (
		<View style={[style.screen, ...customStyle]}>
			{children}
		</View>
	);
}

ScreenWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.arrayOf(PropTypes.object.isRequired),
};

ScreenWrapper.defaultProps = {
	style: [],
};

export default ScreenWrapper;