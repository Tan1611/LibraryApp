import { where, query, getDocs, collection } from 'firebase/firestore';

import { db, auth } from 'src/firebase';

const usersApi = {
  getMe: () => {
    console.log();
    return new Promise((resolve, reject) => {
      // reject(new Error('Error!!!'));
      // return '';
      setTimeout(async () => {
        // eslint-disable-next-line prefer-destructuring
        const currentUser = auth.currentUser;
        const q = query(collection(db, 'users'), where('id', '==' ,`${currentUser.uid}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          resolve({
                    id: doc.id,
                    displayName: doc.data().username,
                    photoURL: doc.data().url,
                    email: doc.data().email,
                  });
        });
      }, 500);
    });
  },
};

export default usersApi;
