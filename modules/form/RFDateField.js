import * as React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

function RFDateField(props) {
  const {
    input: { value, onChange, onBlur, name },
    meta: { touched, error, submitError },
    ...other
  } = props;

  const handleDateChange = (date) => {
    onChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        {...other}
        renderInput={(params) => <TextField {...params} />}
        name={name}
        value={value || null}
        onChange={handleDateChange}
        onBlur={onBlur}
        error={Boolean(touched && (error || submitError))}
        helperText={touched ? error || submitError : ''}
        />
    </LocalizationProvider>
  );
}

RFDateField.propTypes = {
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
};

export default RFDateField;