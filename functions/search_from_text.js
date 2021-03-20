const intersection = require('lodash/intersection');

// searchText: string: 検索ワード
// db: firestore.db
// resolve: function: 検索結果でしたいこと
searchFromText = async(searchText, db, resolve) => {
    db.collection('stations').where("search_index", "array-contains-any", [searchText[0]])
        .get()
        .then((querySnapshot) => {
            let hit = [];
            let hitWords = -1;
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                const matchLength = intersection(searchText.split(''), doc.data().search_index).length
                if (matchLength > hitWords) {
                    hitWords = matchLength;
                    hit = [doc]
                } else if (matchLength == hitWords) {
                    hit.push(doc)
                }
            });
            resolve(hit)
            return ;
        })
}

// examples
// searchFromText('碇', (docs) => {
//     console.log({docs})
//     docs.map((doc) => {
//         console.log({data: doc.data().charactor_name, stations: doc.data().name})
//     })
// })

module.exports = searchFromText;