import * as React from 'react';
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

function TimeField(props) {
  const {
    input: { value, onChange, onBlur, name },
    meta: { touched, error, submitError },
    label,
    ...other
  } = props;

  const handleTimeChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        {...other}
        name={name}
        label={label}
        value={value || null}
        onChange={handleTimeChange}
        onBlur={onBlur}
        renderInput={(params) => <TextField {...params} />} // Replace with your custom input component
      />
    </LocalizationProvider>
  );
}

TimeField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any,
    submitError: PropTypes.any,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default TimeField;
