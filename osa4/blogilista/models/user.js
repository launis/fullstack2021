import mongoose from 'mongoose'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 3    
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

export default User