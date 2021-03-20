'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');
const searchFromText = require('./search_from_text');
const profileContent = require('./profile_content');

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
        let contents = []
        // docs.map((doc) => {
        //     contents.push(profileContent({
        //         id: doc.id,
        //         name: doc.data().name,
        //         station: doc.data().station,
        //         place_guide: doc.data().place_guide,
        //         info: doc.data().info
        //     }))
        // })
        return client.replyMessage(event.replyToken, 
            {
              "type": "flex",
              "altText": "This is a Flex Message",
              "contents": [profileContent({
                id: doc.id,
                name: doc.data().name,
                station: doc.data().station,
                place_guide: doc.data().place_guide,
                info: doc.data().info
            })]
            }
        ).catch(err => {
            console.log(JSON.stringify(err))
        });
    })

    return client.replyMessage(event.replyToken, messages);
}

exports.app = functions.https.onRequest(app);