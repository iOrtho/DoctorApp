import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const Message = ({content: {type, content}, author, isAuthor}) => {

	const msgAuthorStyle = isAuthor ? style.sender : style.recipient;
	const msgStyle = isAuthor ? style.msgSender : style.msgRecipient;

	return (
		<View style={{marginTop: 15}}>
			<Text style={[msgAuthorStyle]}>{author.name}</Text>
			<View style={[style.msg, msgStyle]}>
				{type == 'text' && <Text>{content}</Text>}
			</View>
		</View>
	);
}

Message.propTypes = {
	content: PropTypes.shape({
		type: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}).isRequired,
	author: PropTypes.shape({
		name: PropTypes.string.isRequired,
	}).isRequired,
	isAuthor: PropTypes.bool.isRequired,
};

export default Message;