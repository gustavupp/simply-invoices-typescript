const express = require('express')
const router = express.Router()
const { getUser, addUser, updateUser } = require('../controllers/user')

router.get('/:userId', getUser)

//user json middleware on this unique route
router.post('/add', express.json(), addUser)

//user json middleware on this unique route
router.put('/update', express.json(), updateUser)

module.exports = router
