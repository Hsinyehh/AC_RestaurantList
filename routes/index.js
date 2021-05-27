const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const search = require('./modules/search')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')


router.use('/users', users)
router.use('/search', search)
router.use('/restaurants', restaurants)
router.use('/', home)

module.exports = router