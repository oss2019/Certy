import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			backgroundColor: '#8acaed',
			width: 250,
			height: 150,
			borderRadius: 10,
		},
		control: {
			padding: theme.spacing(5),
		},
		background: {
			backgroundColor: '#080c3c',
			minHeight: '100vh',
			maxWidth: '100vw',
			color: '#ffffff',
			overflow: 'hidden',
		},
	})
);

// export default useStyles;
