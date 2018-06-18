import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const Message = ({content, author, isAuthor}) => {

	const msgStyle = isAuthor ? style.sender : style.recipient;
	return (
		<View>
			<Text style={[msgStyle]}>{author.name}</Text>
			<View style={[style.msg, msgStyle]}>
				<Text>{content}</Text>
			</View>
		</View>
	);
}

Message.propTypes = {
	content: PropTypes.string.isRequired,
	author: PropTypes.shape({
		name: PropTypes.string.isRequired,
	}).isRequired,
	isAuthor: PropTypes.bool.isRequired,
}

export default Message;