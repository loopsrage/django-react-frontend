
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

export default function PaperLayout({children}) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} p={.1} mb={3} elevation={3}>
            {children}
        </Paper>
    );
}