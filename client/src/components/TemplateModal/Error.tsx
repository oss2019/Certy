import React from "react";
import { useStyles } from "./styles";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import  { Button } from "@material-ui/core";
import {withStyles,Theme,} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';


const ColorButton = withStyles((theme: Theme) => ({
    root: {
      color: grey[600],
      backgroundColor: grey[50],
      '&:hover': {
        color:grey[50],
        backgroundColor: grey[900],
      },
      padding:theme.spacing(1, 5, 1),
    },
  }))(Button);

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
    Close:Function;
    errMsg:string;
}

const Error = ({status, Close, errMsg}:errorInterface) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return <div style={modalStyle} className={classes.modalError}>
        <div className={classes.errorParent}>
            <div className={classes.Emoji}>
                <SentimentVeryDissatisfiedIcon style={{fontSize:150}}/>
            </div>
            <div className={classes.resultMsg}>
                Error {status}
            </div>
            <div className={classes.errMsg}>
                {errMsg}
            </div>
            <div className={classes.returnBtn}>
                <ColorButton onClick={() => {Close();}}>Try Again</ColorButton>
            </div>
        </div>
    </div>
}


export default Error;
