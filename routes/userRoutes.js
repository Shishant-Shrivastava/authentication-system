const router = require('express').Router()
const { getAllUsers, getUserById, registerUser, loginUser } = require('../controllers/userController.js')
const User = require('../models/User.js')
const auth = require('../middlewares/auth.js')


router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/signup', registerUser)
router.post('/login', loginUser)
// router.get('/home', auth, homePage)

module.exports = router