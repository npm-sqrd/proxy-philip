const fs = require('fs');
const path = require('path');
const axios = require('axios');
const serviceConfig = require('../service-config2.json');

const fetchBundles = (components, type = 'client') => {
  Object.keys(components).forEach((item) => {
    if (type === 'client') {
      const url = `${components[item].url}/${components[item].client}.js`;
      const client = `${components[item].client}.js`;
      const options = {
        method: 'get',
        url: url,
        responseType: 'stream',
      };
      axios(options).then(response => {
        response.data.pipe(fs.createWriteStream(path.join(__dirname, `../dist/${type}/${client}`)));
      }).catch(err => {
        console.error(err);
      });
    } else if (type === 'server') {
      const url = `${components[item].url}/${components[item].server}.js`;
      const server = `${components[item].server}.js`;
      const options = {
        method: 'get',
        url: url,
        responseType: 'stream',
      };
      axios(options).then(response => {
        response.data.pipe(fs.createWriteStream(path.join(__dirname, `../dist/${type}/${server}`)));
      }).catch(err => {
        console.error(err);
      });
    }
  });
};

fetchBundles(serviceConfig);
fetchBundles(serviceConfig, 'server');
