exports = function (id) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('todos')
    .collection('item')
  const item = collection.findOne({ _id: new BSON.ObjectId(id) })
  return item
}
