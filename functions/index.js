'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');
const searchFromText = require('./search_from_text');

const initDb = require("./db");

const lineConfig = {
    channelSecret: functions.config().linebot.channel_secret,
    channelAccessToken: functions.config().linebot.channel_access_token
};

const app = express();
const db = initDb();

app.post('/webhook', line.middleware(lineConfig), (req, res) => {
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
    const messages = [];
    searchFromText(event.message.text, db, (docs) => {
        docs.map((doc) => {
            console.log({data: doc.data().charactor_name, stations: doc.data().name})
        })
        docs.map((doc) => {
            messages.push(
                {
                    type: 'text',
                    text: `${doc.data().charactor_name}は ${doc.data().name}にいるよ` //実際に返信の言葉を入れる箇所
                }
            )
            console.log({data: doc.data().charactor_name, stations: doc.data().name})
        })
        client.replyMessage(event.replyToken, messages)
    })

    return client.replyMessage(event.replyToken, messages);
}

exports.app = functions.https.onRequest(app);