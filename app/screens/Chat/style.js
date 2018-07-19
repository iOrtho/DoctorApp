import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		padding: 10,
	},
	chatView: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	sender: {
		position: 'absolute',
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignSelf: 'center',
		bottom: 5,
	},
	submitMessage: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
	}
});