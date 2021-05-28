const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

//connnect database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

//取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => { console.log('Error!') })
db.once('open', () => { console.log('Mongodb connected!') })

module.exports = db