
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	// asia-southeast1
	apiKey: 'AIzaSyDnBbSc29AfV7u09JCxRyhJbYwcsXVB_ds',
	authDomain: 'react-samples-11e82.firebaseapp.com',
	projectId: 'react-samples-11e82',
	storageBucket: 'react-samples-11e82.appspot.com',
	messagingSenderId: '177893528454',
	appId: '1:177893528454:web:712ab1c2058c17315b1207',
	measurementId: 'G-1LBPCRV5EZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;