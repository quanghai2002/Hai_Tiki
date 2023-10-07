// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { initializeApp } from 'firebase-admin/app';
// import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: 'AIzaSyD7yJCW3-3KP-LtqPdXTVeflgUfsb9OojU',
//   authDomain: 'quanghai-63364.firebaseapp.com',
//   projectId: 'quanghai-63364',
//   storageBucket: 'quanghai-63364.appspot.com',
//   messagingSenderId: '495507323031',
//   appId: '1:495507323031:web:8d45b8f78ffad73d5851d2',
//   measurementId: 'G-0PN5F0W4GW',
// };


const firebaseConfig = {
  apiKey: 'AIzaSyA8ICCs7mrG2ktCMQzFLIUE82nxaJCprtQ',
  authDomain: 'loginphonenumber-6e88a.firebaseapp.com',
  projectId: 'loginphonenumber-6e88a',
  storageBucket: 'loginphonenumber-6e88a.appspot.com',
  messagingSenderId: '127402134685',
  appId: '1:127402134685:web:ac6a6eb38eded42907d874',
  measurementId: 'G-8WPMSR591F'
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCL8SuwSauC6Nnv-sXMGJdUmuCNL4lyxBQ',
//   authDomain: 'loginphonenumber-d6c0c.firebaseapp.com',
//   projectId: 'loginphonenumber-d6c0c',
//   storageBucket: 'loginphonenumber-d6c0c.appspot.com',
//   messagingSenderId: '748436599260',
//   appId: '1:748436599260:web:917ae890d8877a49431f19',
//   measurementId: 'G-W0CFK9N4YC'
// };



// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
