const express = require('express');
const morgan = require('morgan');
const path = require('path');
const React = require('react');
const ReactDom = require('react-dom/server');

const app = express();
const port = process.env.PORT || 8080;

const serviceConfig = require('../service-config2.json');
const Html = require('../template/html.js');
const Script = require('../template/script.js');
const { fetchBundles } = require('./helper.js');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../dist/client')));

fetchBundles(serviceConfig);
fetchBundles(serviceConfig, 'server');

const summary = require('../dist/server/about-bundle-server.js').default;
// const menu = require('../dist/server/menu-bundle-server.js');
// const reservation = require('../dist/server/reservation-bundle-server.js');
// const review = require('../dist/server/review-bundle-server.js');

const renderComponents = ((components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
});

const services = {
  Summary: summary,
  // Menu: menu,
  // Reservation: reservation,
  // Review: review,
};

app.get('/restaurants/:name', function(req, res){
  const name = {name : 'Restaurant 15000000'};
  let components = renderComponents(services, name);
  res.end(Html(Script(serviceConfig, [components])));
});

app.listen(port, () => {
  console.log('proxy is up and running');
});
