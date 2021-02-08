const router = require('express').Router()
import * as user from '../controllers/user.controller.js'

// REGISTER A USER
router.post('/signup', user.register)

// LOGINS A USER
router.post('/login', user.login)

export default router