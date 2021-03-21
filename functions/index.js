'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');
const messageHandler = require('./handler/message_handler')
const postbackHandler = require('./handler/postback_handler')

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
    console.log(JSON.stringify(event))
    if (event.type === 'message' && event.message.type === 'text') {
        messageHandler(client, event, db);
        return Promise.resolve(null);
    }
    if (event.type === "postback") {
        const data = JSON.parse(event.postback.data);
        postbackHandler(client, event, db, data);

        return Promise.resolve(null);
    }
    client.replyMessage(event.replyToken, [
        {
            type: 'text',
            text: `${event.type} ${event.message.type} ${event.type === 'message' && event.message.type === 'text'}`,
        }
    ])
    return Promise.resolve(null);
}

exports.app = functions.https.onRequest(app);