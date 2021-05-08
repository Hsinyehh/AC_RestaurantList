const express = require('express')
const router = express.Router()
//1-1 直接取用JSON檔的方法
//const restaurantList = require('./restaurant.json')
//1-2 將JSON檔建立資料庫的方法
const Restaurant = require('../../models/restaurant')



//搜尋功能
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  //1-1 直接取用JSON檔的方法
  //const getRestaurant = restaurantList.results.filter(item => { return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword) })
  //res.render('index', { restaurants: getRestaurant, keyword: keyword })

  //1-2 將JSON檔建立資料庫的方法
  return Restaurant.find({
    "$or": [
      { "name": { $regex: `${keyword}`, $options: '$i' } },
      { "category": { $regex: `${keyword}`, $options: '$i' } }
    ]
  })
    .lean()
    .then(rest => res.render('index', { restaurants: rest, keyword: keyword }))

})





module.exports = router