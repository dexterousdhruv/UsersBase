const { Schema, model } = require("mongoose");
const validator = require("validator");
// install validator pkg 

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error('Not a valid email')
      }
    }
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  gender: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true,  versionKey: false })


const User = model('User', userSchema)

module.exports = User