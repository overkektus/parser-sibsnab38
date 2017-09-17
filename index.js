const tress = require('tress');
const needle = require('needle');
const cheerio = require('cheerio');
const chalk = require('chalk');
const resolve = require('url').resolve;
const fs = require('fs');

const URL = 'https://sibsnab38.ru/category/';

const startTime = new Date();

let urls = [];

let q = tress((url, callback) => {
    needle.get(url, (err, res) => {
        if (err) throw err;

        const $ = cheerio.load(res.body);

        $('.caption > h4 > a').each(function(i, elem) {
            urls.push(resolve(URL, $(this).attr('href')));
        });


        if ($('.active').next('li').text() != '') {
            q.push(resolve(URL, $('.active').next('li').children().attr('href')));
        }

        callback();
    });
});


q.push(URL);

q.drain = () => {
    console.log(urls);
    for (let i = 0; i < urls.length; i++) {
        qt.push(urls[i]);
    }
}

let results = [];

let qt = tress((url, callback) => {
    needle.get(url, (err, res) => {
        if (err) throw err;

        const $ = cheerio.load(res.body);

        let item = {};

        let category = $('.breadcrumb > li').eq(2).text();
        let subcategory = $('.breadcrumb > li').eq(3).text();
        let title = $('.product-name > h1').text();
        let manufacturer = $('.info-product > li > a').text();
        let imgs = [];
        let code = $('.info-product > li > span').text().trim();
        let description = $('#tab-description').text();
        let tags = [];

        $('.thumbnail').each(function(i, elem) {
            imgs.push($(this).attr('href'));
            console.log($(this).attr('href'));
        });

        if (code.slice(0, 5) == 'Товар')
            code = code.substr(5).trim();

        item.category = category;
        item.subcategory = subcategory;
        item.title = title;
        item.manufacturer = manufacturer;
        item.imgs = imgs;
        item.code = code;
        item.availability = null;
        item.price = null;
        item.description = description;

        console.log(item);
        results.push(item);
        callback();
    });
}, 4);

function convertTime(time) {
    let seconds = time / 1000;
    let minutes;
    if (seconds % 60 === 0) {
        minutes = seconds / 60;
        seconds = 0;
    } else {
        minutes = Math.floor(seconds / 60);
        seconds = Math.round(seconds - (60 * minutes));
    }

    return minutes + ':' + seconds;
}

qt.drain = () => {
    const endTime = new Date();

    console.log(chalk.red('Parse done! '));
    console.log(chalk.blue('operating time:'), chalk.yellow(convertTime(endTime - startTime)));
    console.log(chalk.blue('found items:'), chalk.yellow(results.length));
};