import { auth } from 'src/firebase';

const usersApi = {
  getMe: () => {
    console.log('');
    return new Promise((resolve, reject) => {
      // reject(new Error('Error!!!'));
      // return '';
      setTimeout(() => {
        // eslint-disable-next-line prefer-destructuring
        const currentUser = auth.currentUser;
        resolve({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          email: currentUser.email,
        });
      }, 500);
    });
  },
};

export default usersApi;
