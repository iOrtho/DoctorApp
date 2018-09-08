import { StyleSheet } from 'react-native';
import styling from 'app/config/styling';

export default StyleSheet.create({
	container: {
		padding: 15,
	},
	msg: {
		backgroundColor: '#eee',
		padding: 10,
	},
	recipient: {
		alignSelf: 'flex-start'
	},
	msgRecipient: {
		// ..
	},
	sender: {
		alignSelf: 'flex-end',
	},
	msgSender: {
		backgroundColor: `${styling.color.main}30`,
	},
});