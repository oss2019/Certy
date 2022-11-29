import React from "react";
import { useState } from "react";
import { Button, TextField, FormGroup, CircularProgress } from "@material-ui/core";
import { useStyles } from "./styles";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

//function to download files and save directly
function download(blob:Blob, filename:string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

interface templateInterface {
    templateName: number;
    preventClose: Function;
    openSuccess: Function;
    showResult: Function;
}

const TemplateModal = ({ templateName, preventClose, openSuccess, showResult }: templateInterface) => {
    const classes = useStyles();
    const [link, setlink] = useState("");
	const [filled, setFilled] = useState(false);
    const [templateNo, setTemplate] = useState("");
    const [loading, setLoading] = useState(false);

	let bodyFormData = new FormData();

	const handleSubmit = () => {
        setLoading(true);
		if(link === ""){
            setFilled(true);
            setLoading(false);
            return;
        } ;
		
		bodyFormData.append('link', link);
		bodyFormData.append('templateID', 'template_'+templateNo);
        fetch("http://localhost:5000/certy_googleSheet", { method: 'POST', body: bodyFormData })
        .then((response) => {
            console.log(response);
            const header = response.headers.get('Content-disposition');
            const parts = header!.split(';');
            const filename = parts[1].split("=")[1];
            response.blob().then(blob => download(blob, filename));
            setLoading(false);
            !loading && preventClose(false);
            !loading && openSuccess(-1);
            !loading && showResult(true);
        })
        .catch((response) => {
            console.log(response);
            setLoading(false);
            !loading && preventClose(false);
            !loading && openSuccess(response.status);
            !loading && showResult(true);
        });
	}

    const [modalStyle] = React.useState(getModalStyle);
    return (
        <div style={modalStyle} className={classes.modal}>
            <h2 id="simple-modal-title">Template_name_{templateName}</h2>
            <div className={classes.modalTemplate}></div>
            <div className={classes.inputContainer}>
                <FormGroup>
                    <TextField
                        value={link}
                        onChange={(e) => setlink(e.target.value)}
                        required
                        style={{ width: "100%" }}
                        label="Enter spreadsheet url"
                        variant="filled"
						error={filled}
                    />

                    <div className={classes.submitButton}>
                        {
                            loading ?
                            <CircularProgress /> :
                            <Button
                                value={templateName}
                                onClick={(e) => {
                                    setTemplate(e.currentTarget.value);
                                    handleSubmit();
                                    preventClose(true);
                                }}
                                variant="contained"
                                size="large"
                            >
                                Generate Certificates
                            </Button>
                        }
                    </div>
                </FormGroup>
            </div>
        </div>
    );
};

export default TemplateModal;
