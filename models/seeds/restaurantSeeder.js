
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

db.once('open', () => {
  console.log('Mongodb connected!')

  for (let i = 0; i < userList.length; i++) {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(userList[i].password, salt))
      .then(hash => User.create({ name: userList[i].name, email: userList[i].email, password: hash }))
      .then(user => {
        let userId = user._id
        let j = i * 3
        //取得餐廳JSON檔
        return Promise.all(Array.from(
          { length: 3 },
          (_, j) =>
            Restaurant.create({
              name: restaurantList.results[j].name,
              name_en: restaurantList.results[j].name_en,
              category: restaurantList.results[j].category,
              image: restaurantList.results[j].image,
              location: restaurantList.results[j].location,
              phone: restaurantList.results[j].phone,
              google_map: restaurantList.results[j].google_map,
              rating: restaurantList.results[j].rating,
              description: restaurantList.results[j].description,
              userId: userId
            })
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })

  }
})

