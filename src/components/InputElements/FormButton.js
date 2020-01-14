import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function FormButton(props) {
  const classes = useStyles();

  return (
    <>
        <Button variant="contained"
            {...props} >
                { props.name }
        </Button>
    </>
  );
}