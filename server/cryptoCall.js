const request = require('request');

const getCryptoData = (queryString, cb) => {
  const options = {
    url: queryString,
  };

  request(options, (err, response, body) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.parse(body));
    }
  });

  // $.ajax({
  //   url: queryString,
  //   method: 'GET',
  //   dataType: 'json',
  //   success: (data) => {
  //     cb(null, JSON.parse(data));
  //   },
  // });
};

module.exports = {
  getCryptoData,
};
