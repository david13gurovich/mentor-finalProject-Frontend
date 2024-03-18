import * as React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { dateStringToObj } from '../lib/dateStringToObj';

function DateTimeField(props) {
  const {
    input: { value, onChange, onBlur, name },
    meta: { touched, error, submitError },
    label,
    ...other
  } = props;

  const handleDateTimeChange = (newValue) => {
    onChange(newValue);
  };
  React.useEffect(() => {
    console.log("Affecting DateTimeField");
    console.log("Value", value);
    if (value && typeof value === "string") {
      const newD = dateStringToObj(value);
      console.log("New Date", newD);
      handleDateTimeChange(newD);
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        {...other}
        name={name}
        label={label}
        value={value}
        onChange={handleDateTimeChange}
        onBlur={onBlur}
        renderInput={(params) => <TextField {...params} />} // Replace with your custom input component
      />
    </LocalizationProvider>
  );
}

DateTimeField.propTypes = {
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

export default DateTimeField;
