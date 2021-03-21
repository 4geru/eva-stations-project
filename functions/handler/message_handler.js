'use strict';

const { includes } = require('lodash');
const profileContent = require('../profile_content');
const searchFromText = require('../search_from_text');

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
        let contents = []
        docs.map(doc => {
          // お気に入りに登録されているかを確認する
          const registration = (doc.data().users || []).includes(event.source.userId)
          contents.push(profileContent({
                id: doc.id,
                charactor_name: doc.data().charactor_name,
                name: doc.data().name,
                image_url: doc.data().image_url,
                place_guide: doc.data().place_guide,
                info: doc.data().info,
                registration: registration
            }))
        })

        return client.replyMessage(event.replyToken, [
            {  
                "type": "flex",
                "altText": "検索結果を表示中です",
                "contents": {
                  "type": "carousel",
                  "contents": contents
                },
                "quickReply": {
                    "items": [
                      {
                        "type": "action",
                        "action": {
                          "type": "location",
                          "label": "駅を登録"
                        }
                      },
                      {
                        "type": "action",
                        "action": {
                          "type": "location",
                          "label": "GPS検索"
                        }
                      }
                    ]
                  }
            }
        ])
    })
}

module.exports = messageHandler