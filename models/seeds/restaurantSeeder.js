
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
const User = require('../user')
const userList = require('./user.json')
const db = require('../../config/mongoose')





//取得資料庫連線狀態

db.once('open', async () => {
  console.log('Mongodb connected!')
  try {
    for (let i = 0; i < userList.length; i++) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(userList[i].password, salt)
      const newUser = await User.create({ ...userList[i], password: hash })
      let userId = newUser._id

      for (let j = i * 3; j < (i + 1) * 3; j++) {
        await Restaurant.create({
          ...restaurantList.results[j], userId
        })
      }
      console.log(`Item-${i} is Done.`)
    }
    console.log('The seeder is done.')
    process.exit()
  }
  catch (error) {
    console.log(error)
    process.exit()
  }
})

