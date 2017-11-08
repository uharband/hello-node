var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path')

app.use(express.static('data'))

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

app.get('/manage/alive', function (req, res) {
    var live = {};
    live.message = "hello-node is alive!";
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(live));
});

app.get('/manage/health', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if(statusObj.crucialDependency1.status.toUpperCase() !== 'UP'){
        res.statusCode = 500;
    }
    res.send(JSON.stringify(statusObj));
});

app.get('/manage/status/:status', function (req, res) {
    if(setStatus(req.params.status)){
        res.send('OK. Set status to ' + req.params.status);
    }
    else
    {
        res.send("NOT OK. Didn't recognize the status you sent. please send either UP or DOWN. and no. i'm not case sensitive");
    }
});

// upload an audio file
app.post('/upload', function(req, res) {
    req.pipe(fs.createWriteStream(__dirname + path.sep + 'data'  + path.sep + 'recording.3gp'));
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK!');
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (!fs.existsSync(__dirname + path.sep + 'data')){
    fs.mkdirSync(__dirname + path.sep + 'data');
}

app.listen(server_port, function () {
    initiateStatus();
    console.log('Example app listening on port ' + server_port + '! try my / api!')
});

var statusObj = {};

function initiateStatus(){
    statusObj.status = "UP";
    statusObj.initialReadiness = {};
    statusObj.initialReadiness.status = "UP";
    statusObj.initialReadiness.lastStatusUpdate = new Date().toISOString();

    statusObj.crucialDependency1 = {};
    setStatus('UP');
}

function setStatus(status){
    if(status.toUpperCase() === 'UP'){
        statusObj.crucialDependency1.status = 'UP';
        statusObj.crucialDependency1.lastStatusUpdate = new Date().toISOString();
        return true;
    }
    if(status.toUpperCase() === 'DOWN'){
        statusObj.crucialDependency1.status = 'DOWN';
        statusObj.crucialDependency1.lastStatusUpdate = new Date().toISOString();
        return true;
    }
    return false;
}
