
import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
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
	fontSize:30,
    color: "#FFFEFE",
    textAlign: "left",
	marginLeft:10
  },
  toolbar:{
	display: "flex",
    justifyContent: "space-between",
  },
   menuButton: {
	fontFamily: "Open Sans, sans-serif",
	fontWeight: 700,
	size: "18px",
	marginLeft: "80px",
   },
}));