
import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';


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
   

  useScrollToTop();


  return (
    <ThemeProvider>
      {/* <RequireAuth> */}
        <Router />
      {/* </RequireAuth> */}
    </ThemeProvider>
  );
}
