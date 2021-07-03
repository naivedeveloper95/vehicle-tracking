module.exports.insert = async (
    collectionName,
    body,
    options
) => {
    const { db } = options;
    try {
        return db.collection(collectionName).insert(body);
    } catch (error) {
        console.error(error);
    }
}

module.exports.fetchLatest = async (
    collectionName,
    selectionCriteria,
    options
) => {
    const { db } = options;
    try {
        return db.collection(collectionName).find(selectionCriteria).sort({ _id: -1 }).limit(1);
    } catch (error) {
        console.error(error);
    }
}

module.exports.findOne = async (
    collectionName,
    selectionCriteria,
    options
) => {
    const { db } = options;
    try {
        return db.collection(collectionName).findOne(selectionCriteria);
    } catch (error) {
        console.error(error);
    }
}

module.exports.find = async (
    collectionName,
    selectionCriteria,
    options
) => {
    const { db } = options;
    try {
        return db.collection(collectionName).find(selectionCriteria);
    } catch (error) {
        console.error(error);
    }
}