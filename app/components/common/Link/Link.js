import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const Link = ({children, style: customStyle, ...others}) => {
	
	return (
		<Text {...others} style={[style.link, ...customStyle]}>
			{children}
		</Text>
	);
}

Link.propTypes = {
	children: PropTypes.node.isRequired,
	onPress: PropTypes.func.isRequired,
	style: PropTypes.array,
};

Link.defaultProps = {
	style: [],	
};

export default Link;