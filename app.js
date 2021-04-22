const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')

//use public file
app.use(express.static('public'))

//layout setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//設定動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const getRestaurant = restaurantList.results.find(item => item.id == req.params.restaurant_id)
  res.render('show', { restaurant: getRestaurant })
})

//搜尋功能
app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  const getRestaurant = restaurantList.results.filter(item => { return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword) })
  console.log(getRestaurant)
  res.render('index', { restaurants: getRestaurant, keyword: keyword })
})


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})