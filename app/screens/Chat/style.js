import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		padding: 10,
	},
	chatView: {
		display: 'flex',
		flexDirection: 'column',
		height: 490,
		marginBottom: 90,
		//height: '60%',
	},
	sender: {
		position: 'absolute',
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignSelf: 'center',
		bottom: 0,
	},
	submitMessage: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
	}
});