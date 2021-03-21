'use strict';
const bookmark = require('../bookmark.js')
const allStations = require('../allStations')
const registrationStations = require('../registrationStations')
const createSearchStationsResponse = require('../response/createSearchStationsResponse');
const postbackHandler = (client, event, db, data) => {
    if(data.type === 'registration') {
        bookmark.registration(db, data.docId, event.source.userId)
        client.replyMessage(event.replyToken, [
            { type: 'text', text: `${data.stationName}駅を📚に追加したよ` },
        ])
        return;
    }
    if(data.type === 'unRegistration') {
        bookmark.unRegistration(db, data.docId, event.source.userId)
        client.replyMessage(event.replyToken, [
            { type: 'text', text: `${data.stationName}駅を📚から削除したよ` },
        ])
        return;
    }
    if(data.type === 'allStation') {
        allStations(db, (chunkedDocs) => {
            let messages = [];
            chunkedDocs.forEach(docs => {
                messages.push(createSearchStationsResponse(docs, event.source.userId))
            })
            client.replyMessage(event.replyToken, messages)
        })
        return;
    }
    if(data.type === 'registrationStation') {
        registrationStations(db, event.source.userId, (chunkedDocs) => {
            let messages = [];
            chunkedDocs.forEach(docs => {
                messages.push(createSearchStationsResponse(docs, event.source.userId))
            })
            client.replyMessage(event.replyToken, messages)
        })
        return;
    }
}

module.exports = postbackHandler