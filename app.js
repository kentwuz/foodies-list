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
  const restaurantId = req.params.restaurant_id
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() == restaurantId)
  res.render('show', { restaurant: restaurant })
})
//search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filterRestaurant = restaurantList.results.filter(restaurant => {

    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurant: filterRestaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log('the server is running')
})