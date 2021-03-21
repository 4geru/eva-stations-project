'use strict';

const searchFromGps = require('../search_from_gps');
const createSearchStationsResponse = require('../response/createSearchStationsResponse');

const locationHandler = (client, event, db) => {
    searchFromGps({latitude: event.message.latitude, longitude: event.message.longitude, db: db, resolve: (docs) => {
        // 検索結果のdocsを元に、flex messageを作成
        const searchStationsResponse = createSearchStationsResponse(docs, event.source.userId);

        return client.replyMessage(event.replyToken, [
          searchStationsResponse
        ])
    }})
}

module.exports = locationHandler