import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextInput from './TextInput';
import { Box } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Checkboxes({callback, values, name}) {
  const [checked, setChecked] = React.useState(true);
  const classes = useStyles();
  
  return (

    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
        <Box p={1} mt={2}>
          <Checkbox 
              color='primary'
              defaultChecked={false}
          />
        </Box>
        <Box p={1} flexGrow={1}>
          <TextInput 
              label="Override this value"
              placeholder="Override this value"
              helperText="Override this value"
              onChange={callback}
              value={values}
          />
        </Box>
    </Box>
      
  );
}