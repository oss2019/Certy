import React from 'react';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Header from '../Header';
import { ButtonBase } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './styles';
import TemplateModal from '../TemplateModal';
import Success from '../TemplateModal/Sucess';
import Error from '../TemplateModal/Error';
import { FlashOnSharp } from '@material-ui/icons';



const TemplatePage = () => {
	const classes = useStyles();

	const [open, setOpen] = React.useState(-1);
	const [loading, setLoading] = React.useState(false);
	const [result, setResult] = React.useState(false);
	const [success, setSuccess] = React.useState(-1);

	const handleOpen = (key: number) => {
		setOpen(key);
	};

	const openSuccess = (key: number) => {
		setSuccess(key);
	};

	const showResult = (val: boolean) => {
		setResult(val);
	};

	const handleClose = (key: number) => {
		setOpen(-1);
		setResult(false);
	};

	const preventClose = (val: boolean) => {
		setLoading(val);
	};

	

	return (
		<div className={classes.background}>
			<div>
				<Header />
			</div>
			<br />
			<br />
			<br />
			<br />
			<Grid container className={classes.root} spacing={6}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" spacing={6}>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
							<Grid key={value} item>
								<div
									onClick={() => {
										handleOpen(value);
									}}
								>
									<ButtonBase
										disableRipple={false}
										disableTouchRipple={false}
										focusRipple={true}
									>
										<Paper className={classes.paper} />
									</ButtonBase>
								</div>

								<Modal
									open={open === value ? true : false}
									onClose={() => {
										// setOpen(false);
										!loading && handleClose(value);
									}}
									aria-labelledby="simple-modal-title"
									aria-describedby="simple-modal-description"
								>
									{
										result ?
										<TemplateModal templateName={value} preventClose={preventClose} openSuccess={openSuccess} showResult={showResult} />:
										(
											success ?
											<Error status={success} />:
											<Success />
										)
									}
									
								</Modal>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default TemplatePage;
