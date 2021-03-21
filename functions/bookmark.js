const uniq = require('lodash/uniq');
const remove = require('lodash/remove');

registration = (db, docId, userId) => {
    db.collection('stations').doc(docId)
    .get()
    .then((doc) => {
        console.log('called')
        console.log(doc.data())
        const users = doc.data().users || [];
        db.collection('stations').doc(docId).set({
            users: uniq([...users, userId])
        }, { merge: true })
    })
}

unRegistration = (db, docId, userId) => {
    db.collection('stations').doc(docId)
    .get()
    .then((doc) => {
        console.log('called')
        console.log(doc.data())
        const users = doc.data().users || [];
        db.collection('stations').doc(docId).set({
            users: remove(users, (user) => user !== userId)
        }, { merge: true })
    })
}

// example
// registration(db, 'DNYoTJJ5u87ZruTbI0kG', 'hotate')
// unRegistration(db, 'DNYoTJJ5u87ZruTbI0kG', 'hotate')

exports.registration = registration
exports.unRegistration = unRegistration
