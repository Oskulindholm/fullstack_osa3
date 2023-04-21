const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Aku Ankka",
      "number": "313",
      "id": 5
    }
  ]

const generateId = () => {
  return Math.floor(Math.random() * 1000)
}

const checkName = (name) => {
    return persons.find(p => p.name.toLowerCase() === name.trim().toLowerCase())
  }

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const now = new Date()
    res.send(`Phonebook has info on ${persons.length} people.<br>${now}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'Name missing.' 
    })
  }
  if (!body.number) {
    return res.status(400).json({ 
      error: 'Number missing.' 
    })
  }
  if (checkName(body.name) !== undefined) {
    return res.status(400).json({ 
      error: `${body.name} is already added to the phonebook.` 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  console.log(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)  
  res.status(204).end()
})
  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
