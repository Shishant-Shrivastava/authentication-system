const router = require('express').Router()
const { getUsers, getUserById, registerUser, loginUser, homePage } = require('../controllers/userController.js')
const User = require('../models/User.js')
const auth = require('../middlewares/auth.js')


// router.get('/users/:id', getUserById)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/home', auth, homePage)

module.exports = router