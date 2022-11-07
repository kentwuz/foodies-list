//basic setting
const express = require('express')
const app = express()
const port = 3000
//loading json file
const restaurantList = require('./restaurant.json')
//express handlebars
const { engine } = require('express-handlebars')
//setting template engine
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//setting static file
app.use(express.static('public'))
//routes setting
//index
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})
//show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params)
  res.render('show')
})

app.listen(port, () => {
  console.log('the server is running')
})