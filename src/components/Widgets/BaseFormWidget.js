import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 5,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

export default function BaseFormWidget({form}){
    const classes = useStyles();
    return (
        <>
            <Paper className={classes.paper} p={.1} mb={3} elevation={3}>
                {form}
            </Paper>
        </>
    );
}