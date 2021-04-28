
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

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