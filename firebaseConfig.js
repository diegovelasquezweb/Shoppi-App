import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3hJCg_wdnvr3NnpCycwA-k_amBAXA-z0",
  authDomain: "react-native-89b09.firebaseapp.com",
  projectId: "react-native-89b09",
  storageBucket: "react-native-89b09.appspot.com",
  messagingSenderId: "137642533063",
  appId: "1:137642533063:web:dff167e3755ee45ae95ee2"
};

var app;

if(!getApps().length){
  app = initializeApp(firebaseConfig);
} else {
  const APPS = getApps();
  app = APPS[0];
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getDatabase(app);
export { auth };
export const firestore = getFirestore(app);