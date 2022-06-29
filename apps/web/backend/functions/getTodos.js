exports = function () {
  const collection = context.services
    .get('mongodb-atlas')
    .db('todos')
    .collection('item')
  const items = collection.find({})

  return items
}
