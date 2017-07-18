var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World! try my /ping api!')
});

app.get('/ping', function (req, res) {
    var time = process.uptime();
    res.send('ok. seconds up: ' + time.toString());
});

app.get('/long/:duration', function (req, res) {
    var sleepDuration = req.params.duration;
    console.log('about to sleep for ' + sleepDuration);
    setTimeout(function(){
        console.log('done sleeping for ' + sleepDuration);
        res.send('ok. slept for ' + sleepDuration + ' ms');
    },sleepDuration);
});

app.get('/payload/:bytes', function(req, res){
    var bytes = parseInt(req.params.bytes);
    const buf = Buffer.alloc(bytes, 'a');
    res.send(buf.toString());

});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

app.listen(server_port, function () {
  console.log('Example app listening on port ' + server_port + '! try my / api!')
})
