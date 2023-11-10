import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageListItem from '@mui/material/ImageListItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { db, storage } from 'src/firebase';

import Iconify from 'src/components/iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'none',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddNewProcduct() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [url, setUrl] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [perc, setPerc] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState('');
  useEffect(() => {
    const uploadFile = () => {
      const nameFile = new Date().getTime() + file.name;
      const storageRef = ref(storage, nameFile);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${  progress  }% done`);
          setPerc(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL)
          });
        }
      );
    };
    // eslint-disable-next-line no-unused-expressions
    file && uploadFile();
  }, [file]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addNewProduct = async () => {
    try {
      await addDoc(collection(db, 'products'), {
        name,
        value,
        url
      });
    } catch (error) {
      console.log(error);
    }
    setName('')
    setValue('')
    setFile('')
    setUrl('')
    handleClose();
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
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
              <ImageListItem sx={{ width: 200, height: 200 }} cols={1}>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
              </ImageListItem>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onChange={(e) => setFile(e.target.files[0])}
              >
                Upload Image
                <VisuallyHiddenInput type="file" />
              </Button>
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
