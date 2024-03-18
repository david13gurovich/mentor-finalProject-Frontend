import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '../components/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const useStyles = styled((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  loadingText: {
    marginTop: theme.spacing(2),
  },
}));

export default function LoadingScreen() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <CircularProgress />
      <Typography variant="h6" className={classes.loadingText}>
        Loading...
      </Typography>
    </Box>
  );
};