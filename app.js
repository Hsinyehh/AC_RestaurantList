const express = require('express')
const session = require('express-session')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// 引用 body-parser
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')


const app = express()
const port = 3000

//layout setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))



// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


//use public file
app.use(express.static('public'))





// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)


app.use(routes)




app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})