const axios = require('axios');
const functions = require('firebase-functions');

const searchFromGps  = ({latitude, longitude, db, resolve}) => {
    const ekispert = axios.create({
        baseURL: 'http://api.ekispert.jp'
    });

    ekispert.get('/v1/json/geo/station', {
        params: {
            key: functions.config().ekispert.api_key,
            geoPoint: `${latitude},${longitude},tokyo,1000`,
            type: 'train',
            corporationBind: 'JR'
        }
    })
    .then(function (response) {
        const points = response.data.ResultSet.Point;

        let stationCodeIds = []
        if(Array.isArray(points)) {
            points.forEach((p) => {
                stationCodeIds.push(p.Station.code)
            })
        } else {
            stationCodeIds = [points.Station.code]
        }

        db.collection('stations')
        .where("ekispart_id", "in", stationCodeIds)
            .get()
            .then((docs) => {
                const hit = []
                docs.forEach((doc) => {
                    hit.push(doc);
                })
                resolve(hit)
            })
    })
}

// example
// searchFromGps({latitude: '35.6783055555556', longitude: '139.770441666667', db: db, resolve: (docs) => {
//     docs.map((doc) => {
//         console.log({data: doc.data().charactor_name, stations: doc.data().name})
//     })
// }});
module.exports = searchFromGps