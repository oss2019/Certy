import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    background: {
        backgroundColor: '#080c3c',
        minHeight: '100vh',
        maxWidth: '100vw',
        color: '#ffffff'
    },
    title: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400
    },
    content: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,
        marginLeft: '5%'
    },
    container: {
        maxWidth: '90%'
    },
    button: {
        color: '#d9e1ee',
        borderColor: '#d9e1ee',
        marginTop: theme.spacing(2)
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));
