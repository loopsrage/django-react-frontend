import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, Typography, Box, makeStyles } from '@material-ui/core';
import Search from './Search';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
}));

export default function AppbarLayout(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        Venafi Training
                    </Typography>
                    <Search />
                </Toolbar>
            </AppBar>
        </div>
    );
};