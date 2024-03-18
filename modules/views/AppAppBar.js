import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '../components/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthState, setAuthState, setUserNameState } from "/modules/model/auth";

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const auth = useSelector(selectAuthState);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    dispatch(setAuthState(""));
    dispatch(setUserNameState(""));
  };

  const deleteAccount = () => {
    fetch("https://localhost:7204/api/Users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
        Authorization: auth,
      },
    });
    signOut(); 
  };
  const settings = [
    <Link
      color="inherit"
      variant="h6"
      underline="none"
      href="/sched"
      sx={rightLink}
    >
      {'Schedule'}
    </Link>,
    <Link
      color="inherit"
      variant="h6"
      underline="none"
      href="/"
      sx={rightLink}
      onClick={deleteAccount}
    >
      {'Delete Account'}
    </Link>,
    <Link
      color="inherit"
      variant="h6"
      underline="none"
      href="/"
      sx={rightLink}
      onClick={signOut}
    >
      {'Sign Out'}
    </Link>
  ];
  const links = auth ? (
    // <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
    //   <Link
    //     color="inherit"
    //     variant="h6"
    //     underline="none"
    //     href="/sched"
    //     sx={rightLink}
    //   >
    //     {'Schedule'}
    //   </Link>
    //   <Link
    //     color="inherit"
    //     variant="h6"
    //     underline="none"
    //     href="/"
    //     sx={rightLink}
    //     onClick={signOut}
    //   >
    //     {'Sign Out'}
    //   </Link>
    // </Box>
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px', }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        slotProps={{
          paper: {
            style: {
            backgroundColor: '#03A9F4', // Set the desired background color here
          },
        }
        }}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}  >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  ) : (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/in/sign-in/"
        sx={rightLink}
      >
        {'Sign In'}
      </Link>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/in/sign-up/"
        sx={{ ...rightLink }}
      >
        {'Sign Up'}
      </Link>
    </Box>
  );
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'mentor'}
          </Link>
          {links}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
