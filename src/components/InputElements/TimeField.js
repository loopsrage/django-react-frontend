import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: 10,
    marginLeft: 10,
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

export default function TimeField(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin="normal"
          label="Time picker"
          style={{ margin: 8 }}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          InputLabelProps={{
            shrink: true,
          }}
          xs={12}
          className={ classes.textField }
          fullWidth
          variant="filled"
          { ...props }
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
