'use strict';

const chunk = require('lodash/chunk');

const allStations = (db, func) => {
    db.collection("stations")
    .orderBy("ekispart_id", "asc")
    .get()
    .then((docs) => {
        const array = []
        docs.forEach((doc) => {
            array.push(doc);
        })
        const chunkedDocs = chunk(array, 10);
        func(chunkedDocs)
    })
}

module.exports = allStations;