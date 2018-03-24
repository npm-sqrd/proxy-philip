const http = require('http');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDom = require('react-dom/server');
const axios = require('axios');

const serviceConfig = require('../service-config2.json');
const Html = require('../template/html.js');
const Script = require('../template/script.js');

const summary = require('../dist/server/about-bundle-server.js').default;
// const menu = require('../dist/server/menu-bundle-server.js').default;
// const reservation = require('../dist/server/reservation-bundle-server.js').default;
// const review = require('../dist/server/review-bundle-server.js').default;

const services = {
  SummaryView: summary,
  // Menu: menu,
  // Reservation: reservation,
  // Review: review,
};

const renderComponents = ((components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
});

const port = process.env.PORT || 8080;

http.createServer((req, res) => {
  console.log('req.url', req.url);
  if (req.url === '/') {
    let components = renderComponents(services);
    res.end(Html(Script(serviceConfig, components)));
  } else if (req.url === '/about-bundle.js') {
    const jsStream = fs.createReadStream(path.join(__dirname, '../dist/client/about-bundle.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    jsStream.pipe(res);
  } else if (req.url.match(/restaurants\/summary\/.+/)) {
    axios({
      method: 'get',
      url: `http://localhost:8081${req.url}`,
    }).then(response => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response.data));
    }).catch(error => {
      console.error(error);
    });
  }
}).listen(port);
console.log(`Server running at http://127.0.0.1:${port}`);