import { StyleSheet } from 'react-native';
import styling from 'app/config/styling';

export default StyleSheet.create({
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
		height: 50,
		width: 50,
		justifyContent: 'center',
		alignSelf: 'center',
		marginBottom: 10,
		borderColor: styling.color.main,
	},
	buttonTitle: {
		flex: 1,
		textAlign: 'center',
		color: styling.color.main,
		textDecorationLine: 'underline',
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
});