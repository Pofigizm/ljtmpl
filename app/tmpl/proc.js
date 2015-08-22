//import fs from 'fs';
var fs = require('fs');
var hs = require('html2hscript');

fs.readFile('twig.template', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  hs(data, (err, res) => console.log(res));
});
