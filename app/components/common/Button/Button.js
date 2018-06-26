import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator as Spinner } from 'react-native';
import { Button as NativeButton } from 'native-base';
import style from './style';

const Button = ({loading, text, children, style: customStyle, ...others}) => {
	
	return (
		<NativeButton {...others} disabled={loading} style={[style.button, ...customStyle]}>
			{(!loading && text) && <Text style={[style.text]}>{text}</Text>}
			{(!loading && children) && <div>{children}</div>}
			{loading &&  <Spinner style={[style.spinner]} color="#fff" />}
		</NativeButton>
	);
}

Button.propTypes = {
	text: PropTypes.string,
	loading: PropTypes.bool,
	style: PropTypes.array,
	children: PropTypes.node,
};

Button.defaultProps = {
	loading: false,
	text: null,
	style: [],
};

export default Button;