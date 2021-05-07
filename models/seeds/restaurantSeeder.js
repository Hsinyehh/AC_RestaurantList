
const db = require('../../config / mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')

//取得資料庫連線狀態

db.once('open', () => {
  console.log('Mongodb connected!')
  //取得餐廳JSON檔
  for (let i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create(restaurantList.results[i])
  }
  console.log('Done!')
})

