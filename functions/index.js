'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelSecret: functions.config().linebot.channel_secret,
    channelAccessToken: functions.config().linebot.channel_access_token
};

console.log(functions.config().linebot.channel_secret)

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    // return ;
    return client.replyMessage(event.replyToken, {
        type: 'text',
        // text: event.message.text //実際に返信の言葉を入れる箇所
        text: 'currenct channel token is sat' //実際に返信の言葉を入れる箇所
    });
}

exports.app = functions.https.onRequest(app);