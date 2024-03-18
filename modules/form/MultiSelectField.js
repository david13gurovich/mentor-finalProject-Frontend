import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

function MultiSelectField(props) {
  const {
    input: { value, onChange, onBlur, name },
    meta: { touched, error, submitError },
    label,
    children,
    ...other
  } = props;

  const handleSelectChange = (event) => {
    const {
        target: { value },
      } = event;
    onChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl error={Boolean(touched && (error || submitError))} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        {...other}
        name={name}
        value={value}
        onChange={handleSelectChange}
        onBlur={onBlur}
        multiple
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
      >
        {children}
      </Select>
    </FormControl>
  );
}

MultiSelectField.propTypes = {
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

export default MultiSelectField;
