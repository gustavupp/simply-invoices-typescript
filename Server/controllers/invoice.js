const db = require('../db/db')

const updateInvoice = (req, res) => {
  console.log({ file: req.file, body: req.body })

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    //if there is a req.file
    if (req.file) {
      const {
        billTo,
        invoiceFrom,
        lineItems,
        date,
        subtotal,
        invoiceNumber,
        invoiceId,
        paymentDetails,
        notes,
      } = req.body
      const image = req.file.path

      connection.query(
        'UPDATE invoices SET billTo = ?, invoiceFrom = ?, lineItems = ?, date = ?, subtotal = ?, invoiceNumber = ?, image = ?, paymentDetails = ?, notes = ? WHERE invoiceId = ?',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          image,
          paymentDetails,
          notes,
          invoiceId,
        ],
        (err, result) => {
          if (err) console.log(err)
          else res.send(result)
        }
      )
    } else {
      //if there is no req.file
      const {
        billTo,
        invoiceFrom,
        lineItems,
        date,
        subtotal,
        invoiceNumber,
        invoiceId,
        paymentDetails,
        notes,
      } = req.body

      connection.query(
        'UPDATE invoices SET billTo = ?, invoiceFrom = ?, lineItems = ?, date = ?, subtotal = ?, invoiceNumber = ?, paymentDetails = ?, notes = ? WHERE invoiceId = ?',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          paymentDetails,
          notes,
          invoiceId,
        ],
        (err, result) => {
          if (err) console.log(err)
          else res.send(result)
        }
      )
    }
    connection.release()
  })
}

const addInvoice = (req, res) => {
  console.log({ body: req.body, file: req.file })

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    //if there is a file type
    if (req.file) {
      const {
        invoiceFrom,
        billTo,
        invoiceNumber,
        date,
        subtotal,
        lineItems,
        userId,
        paymentDetails,
        notes,
      } = req.body
      const image = req.file.path
      connection.query(
        'INSERT INTO invoices (billTo, invoiceFrom, lineItems, date, subtotal, invoiceNumber, userId, image, paymentDetails, notes) VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          userId,
          image,
          paymentDetails,
          notes,
        ],
        (err, result) => {
          if (err) console.log(err)
          else {
            res.send(result)
          }
        }
      )
    } else {
      //if there is not a file type
      const {
        invoiceFrom,
        billTo,
        invoiceNumber,
        date,
        subtotal,
        lineItems,
        userId,
        paymentDetails,
        notes,
      } = req.body

      connection.query(
        'INSERT INTO invoices (billTo, invoiceFrom, lineItems, date, subtotal, invoiceNumber, userId, paymentDetails, notes) VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?)',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          userId,
          paymentDetails,
          notes,
        ],
        (err, result) => {
          if (err) console.log(err)
          else {
            res.send(result)
          }
        }
      )
    }
    connection.release()
  })
}

const deleteInvoice = (req, res) => {
  const { invoiceId } = req.params

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    connection.query(
      'DELETE FROM invoices WHERE invoiceId = ?',
      invoiceId,
      (err, result) => {
        if (err) console.log(err)
        else res.send(result)
      }
    )
    connection.release()
  })
}

const getInvoices = (req, res) => {
  const { userId } = req.params
  let { page, limit } = req.query
  limit = parseInt(limit)
  page = parseInt(page) * parseInt(limit)

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    connection.query(
      'SELECT COUNT(*) as count FROM invoices WHERE userId = ?; SELECT * FROM invoices WHERE userId = ? ORDER BY invoiceId DESC LIMIT ?,?; SELECT subtotal FROM invoices WHERE userId = ?; SELECT date, subtotal FROM invoices WHERE userId = ?',
      [userId, userId, page, limit, userId, userId],
      (err, result) => {
        if (err) console.log(err)
        else {
          //filter all dates within the current fiscal year
          let fiscalYearRange = result[3].filter((item) => {
            if (new Date().getMonth() + 1 <= 6) {
              return (
                item.date >= `${new Date().getFullYear() - 1}-07-01` &&
                item.date <= `${new Date().getFullYear()}-06-30`
              )
            } else {
              return (
                item.date >= `${new Date().getFullYear()}-07-01` &&
                item.date <= `${new Date().getFullYear() + 1}-06-30`
              )
            }
          })

          //sum the values of all invoices of current fiscal year
          let fiscalYearTotal = fiscalYearRange.reduce((acc, cur) => {
            acc += cur.subtotal
            return acc
          }, 0)

          //sum the values of all invoices
          let globalTotal = result[2].reduce((acc, cur) => {
            acc += cur.subtotal
            return acc
          }, 0)

          //add fiscaYearTotal do the result
          result[3] = fiscalYearTotal

          //add global total to the result
          result[2] = globalTotal

          //divide the number of entries by the limit per page to send the number of pages to the frontend
          result[0][0].count = Math.ceil(result[0][0].count / limit)

          //parse lineItems back to json before sending data to frontend
          result[1].forEach((item) => {
            item.lineItems = JSON.parse(item.lineItems)
          })
          res.send(result)
        }
      }
    )
    connection.release()
  })
}

module.exports = { updateInvoice, addInvoice, deleteInvoice, getInvoices }
