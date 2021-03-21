'use strict';

const searchFromText = require('../search_from_text');
const createSearchStationsResponse = require('../response/createSearchStationsResponse');

const logMessage = (event, db) => {
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
}

const messageHandler = (client, event, db) => {
    logMessage(event, db);
    // 。は処理の終了なので、何もしない
    if(event.message.text.includes('する')) return;
    const messages = [];
    searchFromText(event.message.text, db, (docs) => {
        // 検索結果のdocsを元に、flex messageを作成
        const searchStationsResponse = createSearchStationsResponse(docs, event.source.userId)

        return client.replyMessage(event.replyToken, [
          searchStationsResponse
        ])
    })
}

module.exports = messageHandler