const profileContent = require('../profile_content');

const createSearchStationsResponse = (docs, userId) => {
    if(docs.length === 0) {
      return { type: 'text', text: "検索が見つかりませんでした。\n対象の駅名・キャラ名で検索してください\n例）東京、アスカ"}
    }
    const contents = []
  
    docs.map(doc => {
      // お気に入りに登録されているかを確認する
      const registration = (doc.data().users || []).includes(userId)
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
    return {  
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
              "type": "uri",
              "label": "最新情報",
              "uri": "https://twitter.com/jre_eva_dsr"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "location",
              "label": "GPS検索"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "postback",
              "data": "{\"type\":\"registrationStation\"}",
              "label": "📚を見る",
              "text": "📚を表示する"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "postback",
              "data": "{\"type\":\"allStation\"}",
              "label": "全ての駅",
              "text": "全ての駅を表示する"
            }
          }
        ]
      }
    }
}
  
module.exports = createSearchStationsResponse