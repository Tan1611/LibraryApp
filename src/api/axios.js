import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import queryString from 'query-string';

import {auth} from 'src/firebase';

const getFirebaseToken = async () => {
  const currentUsers = auth.currentUser;
  if (currentUsers) return currentUsers;

  // not logged in
  const hasRememberedAccount = localStorage.getItem('user');
  if (!hasRememberedAccount) return null;

  // logged in but current user is not fetched -> wait 10s
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => 
      reject(),10000);
      
    
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) reject();
      
      const token = await user.getIdToken();
      console.log(">check data axios: ", token);
      resolve(token);
      
      unregisterAuthObserver();
      clearTimeout(waitTimer);
    });
    
  });

};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async(config)=> {
    
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
  }, (error)=> 
     Promise.reject(error)
  );

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosClient;
