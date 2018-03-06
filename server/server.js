const express = require('express');
const app = express();

const port = process.env.PORT || 3003;

app.use(express.static('../client'));

app.listen(port, () => {
  console.log('proxy is up and running');
});
