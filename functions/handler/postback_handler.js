'use strict';
const bookmark = require('../bookmark.js')

const postbackHandler = (client, event, db, data) => {
    if(data.type==='registration'){
        bookmark.registration(db, data.docId, event.source.userId)
        client.replyMessage(event.replyToken, [
            { type: 'text', text: `${data.stationName}駅を登録したよ` },
        ])
        return;
    }
    if(data.type==='unRegistration'){
        bookmark.unRegistration(db, data.docId, event.source.userId)
        client.replyMessage(event.replyToken, [
            { type: 'text', text: `${data.stationName}駅を解除したよ` },
        ])
        return;
    }
}

module.exports = postbackHandler