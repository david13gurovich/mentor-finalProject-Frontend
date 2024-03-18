import * as React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function SelectField(props) {
  const {
    input: { value, onChange, onBlur, name },
    meta: { touched, error, submitError },
    label,
    children,
    ...other
  } = props;

  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl error={Boolean(touched && (error || submitError))}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...other}
        name={name}
        value={value}
        onChange={handleSelectChange}
        onBlur={onBlur}
      >
        {children}
      </Select>
    </FormControl>
  );
}

SelectField.propTypes = {
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
  children: PropTypes.node.isRequired,
};

export default SelectField;
