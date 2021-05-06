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
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))

})


//新增儲存餐廳
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

})

//刪除餐廳 
router.delete('/:id', (req, res) => {

  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

})

//編輯餐廳
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})


router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
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
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))

})







module.exports = router