const profileContent = ({id, name, charactor_name, image_url, place_guide, info}) => {
    return {
      "type": "bubble",
      "direction": "ltr",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": `👤 ${charactor_name}`,
            "weight": "regular",
            "size": "xl",
            "color": "#000000",
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
        "backgroundColor": "#FFFFFFFF"
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
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "向かう",
              "uri": "https://linecorp.com"
            },
            "color": "#52D053",
            "margin": "sm",
            "style": "primary"
          }
        ]
      }
    }
}

module.exports = profileContent