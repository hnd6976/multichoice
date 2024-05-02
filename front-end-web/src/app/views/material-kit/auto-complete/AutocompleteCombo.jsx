import { Autocomplete, styled, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import React, { Fragment } from 'react';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 100,
  marginBottom: '16px',
}));
const suggestions = [
  { label: 'Lớp 1' },
  { label: 'Lớp 2' },
  { label: 'Lớp 3' },
  { label: 'Lớp 4' },
  { label: 'Lớp 5' },
  { label: 'Lớp 6' },
  { label: 'Lớp 7' },
  { label: 'Lớp 8' },
  { label: 'Lớp 9' },
  { label: 'Lớp 10' },
  { label: 'Lớp 11' },
  { label: 'Lớp 12' },
];
const filter = createFilterOptions();

const AutocompleteCombo = ({ list, title }) => {
  const [value, setValue] = React.useState(null);

  const handleChange = (_, newValue) => {
    if (newValue && newValue.inputValue) {
      setValue({ label: newValue.inputValue });
      return;
    }
    setValue(newValue);
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    if (params.inputValue !== '') {
      filtered.push({ inputValue: params.inputValue, label: `Add "${params.inputValue}"` });
    }
    return filtered;
  };

  return (
    <Fragment>
      <AutoComplete
        options={list}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label={title} variant="outlined" fullWidth />
        )}
      />
      <AutoComplete
        value={value}
        options={suggestions}
        onChange={handleChange}
        filterOptions={filterOptions}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.label;
        }}
        renderOption={(option) => option.label}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Free solo with text demo" variant="outlined" fullWidth />
        )}
      />

      <AutoComplete
        options={suggestions}
        getOptionLabel={(option) => option.label}
        getOptionDisabled={(option) => option === suggestions[0] || option === suggestions[2]}
        renderInput={(params) => (
          <TextField {...params} label="Disabled option" variant="outlined" fullWidth />
        )}
      />
    </Fragment>
  );
};

export default AutocompleteCombo;
