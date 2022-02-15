import firebase, { initializeApp } from "firebase/app";

const firebaseConfig = {

    apiKey: "AIzaSyCp6fhDfAwBSbQsbTEofQ5-T35aiW8nWx8",
    authDomain: "artikoo-29299.firebaseapp.com",
    projectId: "artikoo-29299",
    storageBucket: "artikoo-29299.appspot.com",
    messagingSenderId: "1069063849556",
    appId: "1:1069063849556:web:fc9c4d8ab0829eb3d20fc1",
    measurementId: "G-E2F9BPG2ND"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);