const express = require('express');

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', function(req,res){
    console.log('REQUEST TO /');
    //delete require.cache[require.resolve(__dirname + '/html/graph.html')];
    res.sendFile(__dirname + '/html/graph.html');
});

app.get('/ajax/getGraph', function(req,res){
    delete require.cache[require.resolve('./extract-roads-master/parser')];
    let city_from_client = req.query.city;
    require('./extract-roads-master/parser')(res, city_from_client);
});

app.get('/ajax/calculatePath', function(req, res){
    delete require.cache[require.resolve('./send-points-to-get-path/main')];
    let points = {};
    points.from = {
        lon: req.query.fromLon,
        lat: req.query.fromLat
    };
    points.to = {
        lon: req.query.toLon,
        lat: req.query.toLat
    };
    points.algo = req.query.alg;
    points.city = req.query.city;
    console.log('Required ' +  points.city);
    require('./send-points-to-get-path/main')(res, points);
});

app.get('/upload', (req, res) => {
    console.log('upload started');
    require('./extract-roads-master/parser')(res);
});

app.get('/test', (req, res) => {
    res.json({kek: 'lol'});
});

app.listen(port, (err)=>{
    if (err){
        console.log(err)
    }
    console.log(`Server is on ${port}`);
});