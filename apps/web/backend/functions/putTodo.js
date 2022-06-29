exports = async function name(id = null, body) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('todos')
    .collection('item')

  if (!id) {
    const { insertedId: _id } = await collection.insertOne(body)
    return collection.findOne({ _id })
  }

  const _id = new BSON.ObjectId(id)
  await collection.updateOne({ _id }, { $set: body })

  return collection.findOne({ _id })
}
