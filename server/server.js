const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('underscore');

const port = process.env.PORT || 6008;

app.use(express.static('../client'));

const compiled = _.template(fs.readFileSync('../client/template.html', 'utf-8'));

app.get('/:id', (req, res) => {
  console.log(req.params.id)

  const template = compiled({id: req.params.id});

  res.send(template);
});

app.listen(port, () => {
  console.log('proxy is up and running');
});
