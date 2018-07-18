import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	dropdown: {
		marginBottom: 20,
	},
	content: {
		padding: 20,
		paddingBottom: 0,
		display: 'flex',
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	day: {
		marginTop: 8,
	},
	bold: {
		fontWeight: 'bold',
	},
	tableRow: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
	},
	dayCell: {
		width: '40%',
		alignSelf: 'stretch',
	},
	timeCell: {
		width: '65%',
		alignSelf: 'stretch',
	},
});