import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { selectClasses } from '@mui/material/Select';
import { inputLabelClasses } from '@mui/material/InputLabel';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const inputStyleMappingClasses = {
  small: 'OnePirateTextField-inputSizeSmall',
  medium: 'OnePirateTextField-inputSizeMedium',
  large: 'OnePirateTextField-inputSizeLarge',
  xlarge: 'OnePirateTextField-inputSizeXLarge',
};

const classes = {
  root: 'OnePirateTextField-root',
  input: 'OnePirateTextField-input',
  inputBorder: 'OnePirateTextField-inputBorder',
};

const styles = ({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  [`& .${classes.input}`]: {
    minWidth: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    '&.Mui-disabled': {
      backgroundColor: theme.palette.divider,
    },
  },
  [`& .${classes.inputBorder}`]: {
    border: '1px solid #e9ddd0',
    '&:focus': {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`& .${inputStyleMappingClasses.small}`]: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)})`,
  },
  [`& .${inputStyleMappingClasses.medium}`]: {
    fontSize: 16,
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)})`,
  },
  [`& .${inputStyleMappingClasses.large}`]: {
    fontSize: 18,
    padding: 20,
    width: `calc(100% - ${20 * 2}px)`,
  },
  [`& .${inputStyleMappingClasses.xlarge}`]: {
    fontSize: 20,
    padding: 25,
    width: `calc(100% - ${25 * 2}px)`,
  },
  [`& .${inputLabelClasses.root}`]: {
    fontSize: 18,
  },
  [`& .${selectClasses.select}`]: {
    height: 'auto',
    borderRadius: 0,
  },
  [`& .${selectClasses.icon}`]: {
    top: '50%',
    marginTop: -12,
  },
});

function DateField(props) {
  const {
    InputProps = {},
    InputLabelProps,
    noBorder,
    size = 'medium',
    SelectProps,
    ...other
  } = props;

  const {
    classes: { input: InputPropsClassesInput, ...InputPropsClassesOther } = {},
    ...InputPropsOther
  } = InputProps;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            InputProps={{
                classes: {
                root: classes.root,
                input: clsx(
                classes.input,
                inputStyleMappingClasses[size],
                {
                    [classes.inputBorder]: !noBorder,
                },
                InputPropsClassesInput,
                ),
                ...InputPropsClassesOther,
                },
                disableUnderline: true,
                ...InputPropsOther,
            }}
            InputLabelProps={{
                ...InputLabelProps,
                shrink: true,
            }}
            SelectProps={SelectProps}
            {...other}
            defaultValue={dayjs(new Date().toISOString())}
        />
    </LocalizationProvider>
  );
}

export default styled(DateField)(styles);
