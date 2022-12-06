import React from "react";
import { useStyles } from "./styles";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import  { Button } from "@material-ui/core";
import {withStyles,Theme,} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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


interface successInterface{
    Close:Function;
}

const Success = ({Close}:successInterface) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return <div style={modalStyle} className={classes.modalSuccess}>
        <div className={classes.errorParent}>
        <div className={classes.errorParent}>
            <div className={classes.Emoji}>
                <InsertEmoticonIcon style={{fontSize:150}}/>
            </div>
            <div className={classes.resultMsg}>
                Success
            </div>
            <div className={classes.returnBtn}>
                <ColorButton onClick={() => {Close();}}>Done</ColorButton>
            </div>
        </div>
        </div>
    </div>
}


export default Success;
