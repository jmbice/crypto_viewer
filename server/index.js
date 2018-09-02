const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const crypto = require('./cryptoCall.js');

app.use (express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log('req body and path:', req.body, req.path);
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/cryptoData/bitcoin', (req, res) => {
  const currency = `currency=${req.body.currency}`;
  const start = `&start=${req.body.startDate}`;
  const end = `&end=${req.body.endDate}`;
  const apiString = `https://api.coindesk.com/v1/bpi/historical/close.json?${currency}${start}${end}`;
  console.log(apiString);
  crypto.getCryptoData(apiString, (err, success) => {
    if (err){
      res.status(404).send();
    } else {
      res.status(200).send(success);
    }
  })
});




// get request to api...
// https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05&currency=EUR

// swap indexes bewteen dollars(usd), euros(eur), yen(cny)...cause, why not.
// ?index=[USD/EUR/CNY]

// ?currency=<VALUE>The currency to return the data in, specified in ISO 4217 format. Defaults to USD.
  // ?currency=<USD>
  // ?currency=<CNY>
  // ?currency=<EUR>

//?start=2013-09-01&end=2013-09-05?currency=EUR

// app.get('/business/:id/appointments', (req, res) => {
//   helper.getBusinessInfo({ id: req.params.id }, (err, success) => {
//     if (err) {
//       res.status(404).send();
//     } else {
//       res.status(200).send(success);
//     }
//   });
// });


app.listen(PORT, () => console.log(`Cake, server is lisenting on ${PORT}`));
