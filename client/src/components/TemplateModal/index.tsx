import React from "react";
import { useState, useRef } from "react";
import {
    Button,
    TextField,
    FormGroup,
    CircularProgress,
    ThemeProvider,
} from "@material-ui/core";
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
function download(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
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
    errMsg: Function;
}

const TemplateModal = ({
    templateName,
    preventClose,
    openSuccess,
    showResult,
    errMsg,
}: templateInterface) => {
    const classes = useStyles();
    const [link, setlink] = useState("");
    const [filled, setFilled] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File>();
    
    let bodyFormData = new FormData();

    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        
        if (!e.target.files) {
            return;
        }
        setFile(e.target.files[0]);
    };

    const handleSubmit = (temp: string) => {
        preventClose(true);
        setLoading(true);
        if (link === "" && file == null) {
            setFilled(true);
            setLoading(false);
            preventClose(false);
            return;
        }
        let request:string;
        bodyFormData.append("link", link);
        bodyFormData.append("templateID", "template_" + temp);
        file != null && bodyFormData.append("excel", file);
        request = (file != null) ? 'http://localhost:5000/certy_upload' : 'http://localhost:5000/certy_googleSheet';

        fetch(request, {
            method: "POST",
            body: bodyFormData,
        })
            .then((response) => {
                if (response.status !== 200) {
                    response
                        .json()
                        .then((data) => ({
                            status: response.status,
                            body: data,
                        }))
                        .then((obj: any) => {
                            console.log(obj);
                            setLoading(false);
                            preventClose(false);
                            openSuccess(response.status);
                            errMsg(obj.body.error.message);
                            showResult(true);
                        });
                } else {
                    console.log(response);
                    const header = response.headers.get("Content-disposition");
                    const parts = header!.split(";");
                    const filename = parts[1].split("=")[1];
                    response.blob().then((blob) => download(blob, filename));
                    setLoading(false);
                    preventClose(false);
                    openSuccess(-1);
                    showResult(true);
                }
            })
            .catch((response) => {
                console.log(response);
                setLoading(false);
                preventClose(false);
                openSuccess(response.status);
                errMsg("");
                showResult(true);
            });
    };

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
                        helperText="Enter the url or upload the spreadsheet"
                        variant="filled"
                        error={filled}
                        disabled={!(file == null)}
                    />
                    <div className={classes.submitButton}>
                        
                        <input
                            type="file"
                            name="excel"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            style={{ display: "none" }}
                            ref={inputRef}
                            onChange={handleUpload}
                        />

                        <Button variant="contained" color="secondary" onClick={()=> inputRef.current?.click()} disabled={link !== ""}>
                        {file ? `${file.name}` : 'Upload a Spreadsheet'}
                        </Button>
                        
                    </div>
                    <div className={classes.submitButton}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                value={templateName}
                                onClick={(e) => {
                                    handleSubmit(e.currentTarget.value);
                                }}
                                variant="contained"
                            >
                                Generate Certificates
                            </Button>
                        )}
                    </div>
                </FormGroup>
            </div>
        </div>
    );
};

export default TemplateModal;
