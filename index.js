var request = require('request');

var URL = 'https://sibsnab38.ru/category';

request(URL, function(err, res, body) {
    if (err) throw err;
    console.log(body);
    console.log(res.statusCode);
});