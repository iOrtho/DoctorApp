import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from './style';

const ChatDayLimit = ({date, style: customStyle}) => {
	
	return (
		<View style={[style.content, ...customStyle]}>
			<Text style={[style.date]}>{moment(date).format('dddd, MMMM Do YYYY')}</Text>
		</View>
	);
}

ChatDayLimit.propTypes = {
	date: PropTypes.object.isRequired,
	style: PropTypes.array,
};

ChatDayLimit.defaultProps = {
	style: [],
};

export default ChatDayLimit;