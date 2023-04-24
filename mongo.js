const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.kcjhgri.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

switch (process.argv.length) {
    case 3:
        console.log('\nCurrent contacts:\n-----------------')
        Person
          .find({})
          .then(persons => {
            persons.forEach(person => {
              console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
            console.log('-----------------')
          })
        break;

    case 5:
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })
        person
          .save()
          .then(res => {
            console.log(`Added ${person.name} number ${person.number} to the phonebook.`)
            mongoose.connection.close()
        })
        break;

    default:
        console.log('Invalid amount of arguments.\nPlease type both the name and the number of the person.')
        mongoose.connection.close()
        break;
}

/*
const person = new Person({
  name: 'Hätäkeskus',
  number: '112',
})

person.save().then(result => {
  console.log('Person saved!')
  mongoose.connection.close()
})
*/