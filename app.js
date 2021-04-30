const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

//1-1 直接取用JSON檔的方法
//const restaurantList = require('./restaurant.json')
//1-2 將JSON檔建立資料庫的方法
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

// 引用 body-parser
const bodyParser = require('body-parser')
const restaurant = require('./models/restaurant')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//connnect database
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

//取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => { console.log('Error!') })
db.once('open', () => { console.log('Mongodb connected!') })



//use public file
app.use(express.static('public'))

//layout setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  //1-1 直接取用JSON檔的方法
  //res.render('index', { restaurants: restaurantList.results })

  //1-2 將JSON檔建立資料庫的方法
  // restaurants為資料庫中餐廳資料的稱呼
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})


//介紹餐廳 
app.get('/restaurants/:id', (req, res) => {
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

//刪除餐廳 
app.post('/restaurants/:id/delete', (req, res) => {

  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

})

//新增餐廳
app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

})

//編輯餐廳
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})


app.post('/restaurants/:id/edit/update', (req, res) => {
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


//搜尋功能(尚未完成)
app.get('/search', (req, res) => {
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


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})