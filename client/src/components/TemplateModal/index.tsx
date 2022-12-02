import React from "react";
import { useState } from "react";
import { Button, TextField, FormGroup, CircularProgress, ThemeProvider } from "@material-ui/core";
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
    errMsg:Function;
}

const TemplateModal = ({ templateName, preventClose, openSuccess, showResult, errMsg }: templateInterface) => {
    const classes = useStyles();
    const [link, setlink] = useState("");
	const [filled, setFilled] = useState(false);
    const [loading, setLoading] = useState(false);

	let bodyFormData = new FormData();

	const handleSubmit = (temp:string) => {
        setLoading(true);
        if(link === ""){
            setFilled(true);
            setLoading(false);
            return;
        } ;
		
		bodyFormData.append('link', link);
		bodyFormData.append('templateID', 'template_'+temp);
        fetch("http://localhost:5000/certy_googleSheet", { method: 'POST', body: bodyFormData })
        .then((response) => {
            if(response.status !== 200){
                response.json()
                .then(data => ({status: response.status, body: data}))
                .then((obj:any) => {
                    console.log(obj);
                    setLoading(false);
                    !loading && preventClose(false);
                    !loading && openSuccess(response.status);
                    !loading && errMsg(obj.body.error.message);
                    !loading && showResult(true);
                });
            }
            else{
                console.log(response);
                const header = response.headers.get('Content-disposition');
                const parts = header!.split(';');
                const filename = parts[1].split("=")[1];
                response.blob().then(blob => download(blob, filename));
                setLoading(false);
                !loading && preventClose(false);
                !loading && openSuccess(-1);
                !loading && showResult(true);
            }
        })
        .catch((response) => {
            console.log(response);
            setLoading(false);
            !loading && preventClose(false);
            !loading && openSuccess(response.status);
            !loading && errMsg("");
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
                    <div>
                        <div style={{fontSize:"1rem", margin:"8px 0px 8px 8px"}}>OR</div>
                        <Button variant="contained" color="secondary">Upload a Spreadsheet</Button>
                    </div>
                    <div className={classes.submitButton}>
                        {
                            loading ?
                            <CircularProgress /> :
                            <Button
                                value={templateName}
                                onClick={(e) => {
                                    handleSubmit(e.currentTarget.value);
                                    preventClose(true);
                                }}
                                variant="contained"
                                
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
