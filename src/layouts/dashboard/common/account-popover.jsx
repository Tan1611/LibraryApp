import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import ImageListItem from '@mui/material/ImageListItem';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { auth } from 'src/firebase';
import { account } from 'src/_mock/account';
import { logout } from 'src/app/authReducer';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.current);

  const handleOpen = (event) => setOpen(event.currentTarget);

  const handleClose = () => setOpen(null);

  const handleOnclick = (option) => {
    switch (option) {
      case 'Home':
        handleClose();
        navigate('/');
        break;
      case 'Profile':
        setOpenModal(true);
        handleClose();
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      const a = logout();
      dispatch(a);
      console.log('ban da dang xuat');
      navigate('/login');
    });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={currentUser.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {currentUser.displayName}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={() => handleOnclick(option.label)}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', py: 1.5 }}
        >
          <LogoutOutlinedIcon />
          <Typography variant="body2" noWrap>
            Log out
          </Typography>
        </MenuItem>
      </Popover>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            sx={{
              mt: 3,
              mb: 3,
            }}
            direction="row"
            spacing={2}
          >
            <Stack spacing={2}>
              {/* <ImageListItem sx={{ width: 200, height: 200 }} cols={1}>
                <img
                  src={
                    currentUser.url
                      ? URL.createObjectURL(currentUser.url)
                      : `/assets/images/avatars/avatar_25.jpg`
                  }
                  alt=""
                />
              </ImageListItem> */}
              <Avatar
                alt="Remy Sharp"
                src={
                  currentUser.url
                    ? URL.createObjectURL(currentUser.url)
                    : `/assets/images/avatars/avatar_2.jpg`
                }
                sx={{ width: 100, height: 100 }}
              />
            </Stack>
            <Stack spacing={3} mb={3}>
              <Typography variant="body2">Username: {currentUser.displayName}</Typography>
              <Typography variant="body2">Email: {currentUser.email}</Typography>
            </Stack>
          </Stack>
          <Button onClick={() => setOpenModal(false)} variant="outlined">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
