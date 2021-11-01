import React from 'react';
import { useStyles } from './styles';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

interface templateInterface {
	templateName: number;
}

const TemplateModal = ({ templateName }: templateInterface) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	return (
		<div style={modalStyle} className={classes.modal}>
			<h2 id="simple-modal-title">Template_name_{templateName}</h2>
			<div className={classes.modalTemplate}></div>
			<div className={classes.inputContainer}>
				<label htmlFor="spreadsheet-url">Enter Spreadsheet url:</label>
				<br />
				<input
					type="url"
					name="spreadsheet-url"
					id="spreadsheet-url"
					className={classes.textInput}
				/>
			</div>
		</div>
	);
};

export default TemplateModal;
