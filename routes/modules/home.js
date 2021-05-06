const express = require('express')
const router = express.Router()
//1-1 直接取用JSON檔的方法
//const restaurantList = require('./restaurant.json')
//1-2 將JSON檔建立資料庫的方法
const Restaurant = require('../../models/restaurant')


//首頁
router.get('/', (req, res) => {
  //1-1 直接取用JSON檔的方法
  //res.render('index', { restaurants: restaurantList.results })

  //1-2 將JSON檔建立資料庫的方法
  // restaurants為資料庫中餐廳資料的稱呼
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})





//新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})


//搜尋功能
router.get('/search', (req, res) => {
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