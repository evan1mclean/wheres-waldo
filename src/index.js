import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuWhAlQLqFs4sSChrtK7TZJ8cE5lBZXGA",
  authDomain: "wheres-waldo-9a5bd.firebaseapp.com",
  projectId: "wheres-waldo-9a5bd",
  storageBucket: "wheres-waldo-9a5bd.appspot.com",
  messagingSenderId: "770694377775",
  appId: "1:770694377775:web:9e2534358ac964ce6871da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore, get a reference to the service and export it
export const db = getFirestore(app);