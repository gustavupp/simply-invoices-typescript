const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {
  updateInvoice,
  addInvoice,
  deleteInvoice,
  getInvoices,
} = require('../controllers/invoice')

/*********************MULTER CONFIG**********************/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) //renames the file with a unique name and appends the original file extension through the 'path' module
  },
})

const upload = multer({ storage })
//info: https://www.npmjs.com/package/multer
/********************************************************/

//update invoices table endpoint
router.put('/update', upload.single('image'), updateInvoice)

//post request endpoint, middleware is passed as a second argument to app.post
router.post('/add', upload.single('image'), addInvoice)

//delete endpoint
router.delete('/:invoiceId', deleteInvoice)

//get endpoint
router.get('/all/:userId', getInvoices)

module.exports = router
