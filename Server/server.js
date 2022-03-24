const express = require('express')
const app = express()
const cors = require('cors')
const users = require('./routes/users')
const invoices = require('./routes/invoices')

//middlewares
app.use(cors())
app.use('/uploads', express.static('./uploads'))

//user routes
app.use('/api/user', users)

//invoice routes
app.use('/api/invoice', invoices)

//server check
app.get('/', (req, res) => {
  res.send('Server running!')
})

//start listening
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
