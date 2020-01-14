import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
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

export default function DateField(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          label="Date picker dialog"
          format="yyyy-MM-ddThh:mm:ss"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{ margin: 8 }}
          InputLabelProps={{
            shrink: true,
          }}
          className={ classes.textField }
          xs={12}
          variant="filled"
          { ...props }
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
        
