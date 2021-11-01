import React from 'react';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Header from '../Header';
import { ButtonBase } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './styles';
import TemplateModal from '../TemplateModal';

const TemplatePage = () => {
	const classes = useStyles();

	const [open, setOpen] = React.useState(-1);

	const handleOpen = (key: number) => {
		setOpen(key);
	};

	const handleClose = (key: number) => {
		setOpen(-1);
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
										handleClose(value);
									}}
									aria-labelledby="simple-modal-title"
									aria-describedby="simple-modal-description"
								>
									<TemplateModal templateName={value} />
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
