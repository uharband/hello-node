var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World! try my /ping api!')
})

app.get('/ping', function (req, res) {
  res.send('ok')
})

app.get('/long/:duration', function (req, res) {
  var sleepDuration = req.params.duration;
  console.log('about to sleep for ' + sleepDuration);
  setTimeout(function(){
      console.log('done sleeping for ' + sleepDuration);
      res.send('ok. slept for ' + sleepDuration + ' ms');
  },sleepDuration);
})


app.listen(8090, function () {
  console.log('Example app listening on port 8090! try my / api!')
})