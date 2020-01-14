
import React from 'react';
import TextInput from '../InputElements/TextInput';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../api';


const testsUrl = 'http://localhost:533/api/v1/tests/'

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

//   const [selected, setSelected] = useState('')


  const handleTestNames = async (e) => {
      await api.get(testsUrl)
            .then(res => {
                console.log(res.data.name)
            })
            .catch(err => {
                console.log(err)
            })
  }



    // (async () => {
    //   const response = await fetch(testsUrl);
    //   const tests = await response.json();

    //     setOptions(Object.keys(tests).map(name => tests[0][name]));
      
    // })();


  return (
    <Autocomplete
      id="sync"
      style={{ width: 400 }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}

      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}

      renderInput={params => (
        <TextInput
          {...params}
          label="Select a Test"
          fullWidth
          variant="filled"
          placeholder=''
          helperText=''
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={30} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}