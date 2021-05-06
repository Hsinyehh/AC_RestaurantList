const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//const restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')



const app = express()
const port = 3000

// 引用 body-parser
const bodyParser = require('body-parser')

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

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(routes)




app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})