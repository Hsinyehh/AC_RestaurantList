const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
//1-1 直接取用JSON檔的方法
//const restaurantList = require('./restaurant.json')
//1-2 將JSON檔建立資料庫的方法
const Restaurant = require('../../models/restaurant')



//介紹餐廳 
router.get('/:id', (req, res) => {
  //1-1 直接取用JSON檔的方法
  //const getRestaurant = restaurantList.results.find(item => item.id.toString() === req.params:id)
  //res.render('show', { restaurant: getRestaurant .)

  //1-2 將JSON檔建立資料庫的方法
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))

})


//新增儲存餐廳
router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({
    ...req.body,
    userId: userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

})

//刪除餐廳 
router.delete('/:id', (req, res) => {

  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

})

//編輯餐廳
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})


router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))

})







module.exports = router