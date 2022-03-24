const mysql = require('mysql')

//mysql://b947055890e9b7:223b1a82@us-cdbr-east-05.cleardb.net/heroku_a49fd43e442dcb8?reconnect=true

//databse connection
const db = mysql.createPool({
  multipleStatements: true, //allows multiple queries
  connectionLimit: 100,
  user: 'b947055890e9b7',
  host: 'us-cdbr-east-05.cleardb.net',
  password: '223b1a82',
  database: 'heroku_a49fd43e442dcb8',
})

module.exports = db
