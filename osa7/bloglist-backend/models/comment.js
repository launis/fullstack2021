import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    title: { type: String, required: true },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  })

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment