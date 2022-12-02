import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			position: 'absolute',
			width: '70%',
			maxWidth: 500,
			height: 'auto',
			backgroundColor: theme.palette.background.paper,
			borderRadius: 20,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 5),
			// paddingLeft: 100,
			// paddingLeft: '5%',
		},
		modalTemplate: {
			backgroundColor: '#C4C4C4',
			width: '80%',
			// maxWidth: '70%',
			aspectRatio:'16/9',
			
			marginRight:'auto',
			marginLeft:'auto',
			marginTop:50,
			borderRadius: 10,
		},
		inputContainer: {
			marginTop: 50,
			display: 'flex',
			flexDirection: 'column',
			color: '#080C3C',
			fontSize: 20,
		},
		textInput: {
			outline: 'none',
			background: '#9FC3FF',
			border: '2px solid #4285F4',
			borderRadius: 10,
			fontSize: 14,
			paddingLeft: 10,
			paddingRight: 10,
			// marginTop: '0.5rem',
			margin:'0.5rem auto 0',
			width: '80%',
			maxWidth: 476,
			height: '40px',
			left: '374px',
			top: '637px',
		},
		submitButton: {
			marginTop: '1rem',
		},
		modalError:{
			position: 'absolute',
			width: '70%',
			maxWidth: 500,
			height: 'auto',
			// backgroundColor: theme.palette.background.paper,
			borderRadius: 20,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 2),
			backgroundColor:"#f26152",
		},
		modalSuccess:{
			position: 'absolute',
			width: '70%',
			maxWidth: 500,
			height: 'auto',
			// backgroundColor: theme.palette.background.paper,
			borderRadius: 20,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 2),
			backgroundColor:"#20DA9B",
		},
		errorParent:{
			width:'100%',
			height:'100%',
			color:'#fff',
		},
		Emoji:{
			textAlign:'center',
			padding:"40px 0",
		},
		resultMsg:{
			textAlign:'center',
			fontSize:'2rem',
		},
		returnBtn:{
			textAlign:'center',
			padding:theme.spacing(4, 0, 2),
		},
		errMsg:{
			textAlign:'center',
			margin:theme.spacing(2, 0, 0),
		}
	})
);

// export default useStyles;
