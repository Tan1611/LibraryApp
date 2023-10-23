import { useState } from 'react';
// import PropTypes from 'prop-types';

import { addDoc, collection } from "firebase/firestore";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
 
import {database} from 'src/firebase'

import Iconify from 'src/components/iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddNewProcduct() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  //   const [img, setImg] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewProduct = async () => {
    try {
        const res = await addDoc(collection(database, 'product'),{
            name,
            value,
            // img: img,
        });
        console.log(res);
     } catch (error) {
        console.log(error);
        }
    handleClose();
  };
  return (
    <div>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleOpen}
      >
        Add New Book
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
              <Avatar
                alt="Remy Sharp"
                src="public/assets/images/avatars/avatar_10.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Stack>
            <Stack spacing={3} mb={3}>
              <TextField
                name="name"
                label="Tiltle"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                name="value"
                label="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Stack>
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={addNewProduct}
          >
            Add
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
