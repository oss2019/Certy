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

const Success = () => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return <div style={modalStyle} className={classes.modal}>
        <div className={classes.succesParent}>
            Success
        </div>
    </div>
}


export default Success;
