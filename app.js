const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

//1-1 直接取用JSON檔的方法
//const restaurantList = require('./restaurant.json')
//1-2 將JSON檔建立資料庫的方法
const Restaurant = require('./models/restaurant')


const app = express()
const port = 3000

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

//詳細介紹功能 (設定動態路由)
app.get('/restaurants/:restaurant_id', (req, res) => {
  //1-1 直接取用JSON檔的方法
  //const getRestaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  //res.render('show', { restaurant: getRestaurant })

  //1-2 將JSON檔建立資料庫的方法
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))

})

//搜尋功能
app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  //1-1 直接取用JSON檔的方法
  //const getRestaurant = restaurantList.results.filter(item => { return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword) })
  // res.render('index', { restaurants: getRestaurant, keyword: keyword })
})


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})