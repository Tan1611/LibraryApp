/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from "react-router-dom";  
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { ref, set, getDatabase } from "firebase/database";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { auth } from 'src/firebase';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'redirect',
//   signInSuccessUrl: '/',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     // firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ],
//   // callbacks: {
//   //   // Avoid redirects after sign-in.
//   //   signInSuccessWithAuthResult: () => false,
//   // },
// };
export default function LoginView() {
  const theme = useTheme();
  const db = getDatabase();
  const navigate = useNavigate();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showForm, setShowForm] = useState(true);

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = {...userCredential.user};
    console.log(user);
    const log = {
      uids: user.uid
    }
    navigate('/',{
      state: log
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorerrorCodeMessage = error.message;
    router.push('/404');
  });
    
  };

  const hanhandleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        set(ref(db, `users/${success.user.uid}`), {
          username: {username},
          email: {email},
          id: success.user.uid
        });
        router.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        router.push('/404');
      });
    // console.log(username, email, password);
  };

  return (
    <>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
      >
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          {showForm ? (
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 420,
              }}
            >
              <Typography variant="h4">Sign in</Typography>
              {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  OR
                </Typography>
              </Divider>
              <Stack>
                <Stack spacing={3}>
                  <TextField
                    name="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                  <Link variant="subtitle2" underline="hover">
                    Forgot password?
                  </Link>
                </Stack>

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  onClick={handleSignin}
                >
                  Sign in
                </LoadingButton>
              </Stack>
            </Card>
          ) : (
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 420,
              }}
            >
              <Typography variant="h4">Sign Up</Typography>
              <Stack
                sx={{
                  mt: 3,
                }}
              >
                <Stack spacing={3}>
                  <TextField
                    name="username"
                    label="User name"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <TextField
                    name="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <LoadingButton
                  sx={{ mt: 5 }}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  onClick={hanhandleSignup}
                >
                  Sign Up
                </LoadingButton>
              </Stack>
            </Card>
          )}
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {showForm ? 'Don’t have an account?' : 'Already have an account!'}
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Sign up' : 'Sign in'}
            </Button>
          </Typography>
        </Stack>
      </Box>{' '}
    </>
  );
}
