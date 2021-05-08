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




module.exports = router