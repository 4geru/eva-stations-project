'use strict';

const chunk = require('lodash/chunk');

const registrationStations = (db, userId, func) => {
    db.collection("stations")
    .where("users", "array-contains-any", [userId])
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

module.exports = registrationStations;