'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');

const firebase = require("firebase");
require("firebase/firestore");
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseUrl: process.env.FIREBASE_DATABSE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const lineConfig = {
    channelSecret: functions.config().linebot.channel_secret,
    channelAccessToken: functions.config().linebot.channel_access_token
};

console.log(functions.config().linebot.channel_secret)

const app = express();

app.post('/webhook', line.middleware(lineConfig), (req, res) => {
    console.log(req.body.events);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(lineConfig);

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    if (event.source.roomId) {
        db.collection("rooms").doc(event.source.userId).collection('messages').add({
            user_id: event.source.userId,
            room_id: event.source.roomId,
            message: event.message.text
        })
    }
    if (event.source.userId) {
        db.collection("users").doc(event.source.userId).collection('messages').add({
            user_id: event.source.userId,
            room_id: event.source.roomId || '',
            message: event.message.text
        })
    }
    // return ;
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text //実際に返信の言葉を入れる箇所
    });
}

exports.app = functions.https.onRequest(app);