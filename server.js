var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World! try my /ping api!')
})

app.get('/ping', function (req, res) {
  res.send('ok')
})


app.listen(8080, function () {
  console.log('Example app listening on port 8080! try my / api!')
})