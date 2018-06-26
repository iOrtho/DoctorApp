import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import styling from 'app/config/styling';

const ScreenLoading = ({style: customStyle}) => {
	
	return (
		<View style={[style.container, ...customStyle]}>
			<ActivityIndicator color={styling.color.main} style={[style.spinner]} />
		</View>
	);
}

ScreenLoading.propTypes = {
	style: PropTypes.array,
};

ScreenLoading.defaultProps = {
	style: [],
};

export default ScreenLoading;