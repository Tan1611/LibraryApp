/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// import { useEffect } from 'react';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// import firebase from 'firebase';
// // import userAPI from './api/userAPI';
// // ----------------------------------------------------------------------
// const config = {
//   apiKey: import.meta.env.VITE_FIREBASE_API,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   // ...
// };
// firebase.initializeApp(config);

export default function App() {
  // const [userList, setUserList] = useState([]);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await userAPI.getall();
  //     console.log('>check user: ', user);
  //   };

  //   fetchUser();
  // }, []);

  useScrollToTop();

  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
  //     if (!user) {
  //       return console.log('User is not logged in');
  //     }
  //     // console.log('User is signed in', user.displayName);

  //     // const token = await user.getIdToken();
  //     // console.log('User is signed in', token);
  //     return null;
  //   });
  //   return () => unregisterAuthObserver();
  // }, []);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
