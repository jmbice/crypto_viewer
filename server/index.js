const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use (express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.body, res.path);
  next();
})

// get request to api...
// https://api.coindesk.com/v1/bpi/historical/close.json

// swap indexes bewteen dollars(usd), euros(eur), yen(cny)...cause, why not.
// ?index=[USD/EUR/CNY]

// ?currency=<VALUE>The currency to return the data in, specified in ISO 4217 format. Defaults to USD.
  // ?currency=<USD>
  // ?currency=<CNY>
  // ?currency=<EUR>

//?start=2013-09-01&end=2013-09-05

app.listen(PORT, () => console.log(`Cake, server is lisenting on ${PORT}`));
