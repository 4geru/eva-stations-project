const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
require('dotenv').config();

initDb = () => {
    const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseUrl: process.env.FIREBASE_DATABSE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    }
    
    firebase.initializeApp(config);

    const db = firebase.firestore();
    return db;
}

module.exports = initDb;
