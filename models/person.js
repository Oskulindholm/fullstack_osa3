const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = `${process.env.MONGODB_URI}`

console.log(process.env.MONGODB_URI)
console.log('connecting to', url)

mongoose.connect(url)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: String
})

personSchema.set('toJSON', {
    transform: (document, retObj) => {
      retObj.id = retObj._id.toString()
      delete retObj._id
      delete retObj.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)