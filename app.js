const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
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
  res.render('index', { restaurants: restaurantList.results })
})

//詳細介紹功能 (設定動態路由)
app.get('/restaurants/:restaurant_id', (req, res) => {
  const getRestaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: getRestaurant })
})

//搜尋功能
app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  const getRestaurant = restaurantList.results.filter(item => { return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword) })
  res.render('index', { restaurants: getRestaurant, keyword: keyword })
})


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})