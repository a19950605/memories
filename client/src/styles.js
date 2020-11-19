import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		color: 'rgba(0,183,255, 1)',
	},
	image: {
		//	marginTop: '5px',
		marginLeft: '15px',
	},

	form: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	fileInput: {
		width: '97%',
		margin: '10px 0',
	},
	buttonSubmit: {
		marginBottom: 10,
	},
	paper: {
		paddingTop: '20px',
		paddingBottom: '20px',
	},
}));
