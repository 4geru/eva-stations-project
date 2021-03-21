const profileContent = ({id, name, charactor_name, image_url, place_guide, info, registration}) => {
    return {
      "type": "bubble",
      "direction": "ltr",
      "header": {
        "backgroundColor": (registration ? "#e50000" : "#5b496c"),
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": `👤 ${charactor_name}`,
            "weight": "regular",
            "size": "xl",
            "color": "#ffffff",
            "wrap": true,
            "contents": []
          }
        ]
      },
      "hero": {
        "type": "image",
        "url": image_url || "https://pbs.twimg.com/media/Ew06IcfVEAAXbjc?format=jpg&name=4096x4096",
        "size": "full",
        "aspectRatio": "1.51:1",
        "backgroundColor": "#FFFFFFFF",
        "offsetTop": "10px"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "separator"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "margin": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "駅名",
                    "align": "start",
                    "offsetStart": "10px",
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": "ヒント",
                    "offsetStart": "10px",
                    "contents": []
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": name,
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": place_guide,
                    "wrap": true,
                    "contents": []
                  }
                ]
              }
            ]
          },
          (info ? {
            "type": "text",
            "text": `※ ${info}`,
            "margin": "sm",
            "wrap": true,
            "contents": []
          } : {
            "type": "spacer"
          })
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          ( registration ?
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": `${name}駅を解除`,
                "text": `${name}駅を解除する`,
                "data": JSON.stringify({type: 'unRegistration', docId: id, stationName: name})
              },
              "color": "#e50000",
              "margin": "sm",
              "style": "primary"
            } :
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": `${name}駅を登録`,
                "text": `${name}駅を登録する`,
                "data": JSON.stringify({type: 'registration', docId: id, stationName: name})
              },
              "color": "#5b496c",
              "margin": "sm",
              "style": "primary"
            }
          ),
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": `${name}駅に向かう`,
              "uri": "https://linecorp.com"
            },
            "color": ( registration ? "#ffab00" : "#52D053" ),
            "margin": "sm",
            "style": "primary"
          },
        ]
      }
    }
}

module.exports = profileContent