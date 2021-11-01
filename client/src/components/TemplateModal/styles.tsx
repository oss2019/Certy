import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			position: 'absolute',
			width: 900,
			maxWidth: '70%',
			height: 500,
			backgroundColor: theme.palette.background.paper,
			borderRadius: 20,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			// paddingLeft: 100,
			paddingLeft: '5%',
		},
		modalTemplate: {
			backgroundColor: '#C4C4C4',
			width: 250,
			maxWidth: '70%',
			height: 150,
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

			width: '610px',
			maxWidth: '80%',
			height: '40px',
			left: '374px',
			top: '637px',
		},
	})
);

// export default useStyles;
