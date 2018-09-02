import React from 'react';
import {Bar} from 'react-chartjs-2';
import moment from 'moment';

const Chart = (props) => {
  const { historicCryptoData, selectedCurrency } = props;
  const data =  {
          labels: Object.keys(historicCryptoData),
          datasets: [{
          label: `Evaluating Bitcoin in ${selectedCurrency}`,
          backgroundColor: '#33dacd',
          borderColor: '#33dacd',
          data: Object.values(historicCryptoData),
          }]
  };

  return (
    <div>
      <Bar
        data={data}
        height={100}
        width={400}
      />
    </div>
  );
}

export default Chart;
