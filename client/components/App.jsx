import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import Chart from './Chart.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historicCryptoData: [],
      startDate: '',
      endDate: '',
      selectedCurrency: '',
    }
  }

  // componentWillMount() {
  //   //make api calls here
  // }


  render() {
    return (
      <div>
        <Chart />
      </div>
    )
  }
};

export default App;
