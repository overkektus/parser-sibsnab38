const tress = require('tress');
const needle = require('needle');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://sibsnab38.ru/category';

let results = [];

let q = tress((url, callback) => {
    needle.get(url, (err, res) => {
        if (err) throw err;

        let $ = cheerio.load(res.body);

    });
});