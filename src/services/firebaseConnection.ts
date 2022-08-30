import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAfO8nkOUHCJTtKYXbcqLGPOrWUy8FV0gY',
  authDomain:'boardapp-a130c.firebaseapp.com',
  projectId: 'boardapp-a130c',
  storageBucket: 'boardapp-a130c.appspot.com',
  messagingSenderId: '731615614200',
  appId: '1:731615614200:web:78296d4c666535e44a170d',
  measurementId: 'G-K480ECNR0H'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export  { app, db };
