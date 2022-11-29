import React from "react";
import { useState } from "react";
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

interface errorInterface{
    status:number;
}

const Error = ({status}:errorInterface) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return <div style={modalStyle} className={classes.modal}>
        <div className={classes.errorParent}>
            Error
        </div>
    </div>
}


export default Error;
