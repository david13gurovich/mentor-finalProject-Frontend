import * as React from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';

function RatingField(props) {
  const {
    input: { value, onChange, onBlur, name },
    meta: { touched, error, submitError },
    ...other
  } = props;

  const handleRatingChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Rating
      {...other}
      name={name}
      value={value}
      onChange={handleRatingChange}
      onBlur={onBlur}
      error={Boolean(touched && (error || submitError))}
      helperText={touched ? error || submitError : ''}
    />
  );
}

RatingField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.number,
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

export default RatingField;
