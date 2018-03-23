const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const request = require('request');

const exist = Promise.promisify(fs.stat);

const fetchBundles = (components, type = 'client') => {
  Object.keys(components).forEach((item) => {
    if (type === 'client') {
      const url = `${components[item].url}/${components[item].client}.js`;
      const client = `${components[item].client}.js`;
      exist(path.join(__dirname, `../dist/${type}/${client}`)).catch((err) => {
        if (err.code === 'ENOENT') {
          request(url).pipe(fs.createWriteStream(path.join(__dirname, `../dist/${type}/${client}`)));
        }
      });
    } else if (type === 'server') {
      const url = `${components[item].url}/${components[item].server}.js`;
      const server = `${components[item].server}.js`;
      exist(path.join(__dirname, `../dist/${type}/${server}`)).catch((err) => {
        if (err.code === 'ENOENT') {
          request(url).pipe(fs.createWriteStream(path.join(__dirname, `../dist/${type}/${server}`)));
        }
      });
    }
  });
};

module.exports.fetchBundles = fetchBundles;
