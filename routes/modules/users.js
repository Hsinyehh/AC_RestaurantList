const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'The Form is not completed yet.' })
  }
  if (name !== confirmPassword) {
    errors.push({ message: 'The passwords are not consistent.' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }


  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'The Email already exits.' })
        res.render('register', { name, email, password, confirmPassword, errors })
      }
      else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({ name: name, email: email, password: hash }))
          .then(() => res.redirect('/'))
          .catch(err => console.log('err'))
      }
    })

})

router.get('/logout', (req, res) => {
  req.flash('success_msg', 'Logout Successfully!')
  req.logout()
  res.redirect('/users/login')
})



module.exports = router