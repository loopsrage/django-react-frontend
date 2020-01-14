import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextInput from '../InputElements/TextInput';

export default function ComboBoxField(props) {
  const {
    label, 
    helperText,
    callback,
    searchCallback,
    options,
  } = props

  const handleTagsChange = (e, v) => {
    callback(e, v)
  }

  const handleSearch = (e) => {
    searchCallback(e.target.value)
  }

  return (
      <>
      <Autocomplete
        multiple
        id="tags-filled"
        options={
          options.map(option => {
            return option.id + ": " + option.first_name + " " + option.last_name
          })
        }
        onChange={handleTagsChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined"  key={index} label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={params => (
          <TextInput
            {...params}
            variant="filled"
            label={label}
            placeholder={label}
            onChange={handleSearch}
            helperText={helperText}
            fullWidth
          />
        )}
      />
    </>
  );
}
