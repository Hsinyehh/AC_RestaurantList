const express = require('express')
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
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
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
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      restaurant.userId = userId
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))

})







module.exports = router