exports = async function deleteTodo(id) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('todos')
    .collection('item')

  const _id = new BSON.ObjectId(id)
  const item = collection.findOneAndDelete({ _id })
  return item
}
