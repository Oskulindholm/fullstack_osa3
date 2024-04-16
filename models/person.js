const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = `${process.env.MONGODB_URI}`

console.log(process.env.MONGODB_URI)
console.log('connecting to', url)

const checkNumber = number => {
 return 
}

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
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        console.log('Validation tests: ' + /\d{2}-\d{7}/.test(v) + ' ' + /\d{3}-\d{8}/.test(v))
        return !(/\d{2}-\d{7}/.test(v) || /\d{3}-\d{8}/.test(v))
      },
      message: "The number is malformatted"
    },
    required: true
  }
})

personSchema.set('toJSON', {
    transform: (document, retObj) => {
      retObj.id = retObj._id.toString()
      delete retObj._id
      delete retObj.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)