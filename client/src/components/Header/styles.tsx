import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => createStyles({
   header: {
      backgroundColor: "#4285F4",
   },
   image: {
	   display: "flex",
   },
   logo: {
	   display: "flex",
	   position: "relative",
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
	   fontSize: 30,
      color: "#FFFEFE",
      textAlign: "left",
	   marginLeft: "10px",
      cursor: "pointer"
   },
   toolbar:{
      display: "flex",
      justifyContent: "space-between",
   },
   menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "20px"
   },
   headerChildren: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginRight: "60px"
   }
}));