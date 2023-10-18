import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  transacciones: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
})

const User = model('User', userSchema)

export default User
