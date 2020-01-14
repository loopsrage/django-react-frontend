import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  root: {
    marginRight: 10,
    marginLeft: 10,
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

export default function TextInput(props) {
  const classes = useStyles();

  return (
    <>
      <TextField
        label="Override this value"
        style={{ margin: 8 }}
        placeholder="Override this value"
        helperText="Override this value"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        xs={12}
        className={ classes.textField }
        variant="filled"
        value='Override this value'
        { ...props }
      />
    </>
  );
}