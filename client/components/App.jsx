import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import $ from 'jquery';
import Chart from './Chart.jsx';
import CurrencyPicker from './CurrencyPicker.jsx';
import PickDate from './PickDate.jsx';
import '../css/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historicCryptoData: {},
      startDate: null,
      endDate: null,
      focus: null,
      selectedCurrency: 'USD',
      currencyOptions: ['USD', 'EUR', 'CNY'],
    }
    this.setCurrency = this.setCurrency.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.getDataGivenConstraints = this.getDataGivenConstraints.bind(this);
  }

  getDataGivenConstraints() {
    const { selectedCurrency, startDate, endDate } = this.state;

    if (startDate === null || endDate === null) {
      alert('Please select a start and end date.')
      return;
    }

    const data = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      currency: selectedCurrency,
    };

    $.ajax({
      url: `http://localhost:3000/cryptoData/bitcoin/`,
      method: 'POST',
      data: data,
      dataType: 'json',
      success: (data) => {
        this.setState({ historicCryptoData: data.bpi });
      }
    });

  }

  setDate(date) {
    this.setState({
      startDate: date.startDate,
      endDate: date.endDate,
    }, () => {

      const { startDate, endDate } = this.state;
      if (startDate, endDate) {
        this.getDataGivenConstraints();
      }
    });
  }

  setFocus(focusedInput) {
    this.setState({ focus: focusedInput })
  }

  setCurrency(e) {
    const { startDate, endDate } = this.state;
    const currency = e.target.value;
    this.setState({ selectedCurrency: currency }, () => {
      if (startDate && endDate) {
        this.getDataGivenConstraints();
      }
    });
  }

  render() {
    const {
      historicCryptoData, focus, startDate, endDate,
      selectedCurrency, currencyOptions,
    } = this.state;

    let start = startDate === null ? '?' : moment(startDate).format('MM-DD-YYYY');
    let end = endDate === null ? '?' : moment(endDate).format('MM-DD-YYYY');

    return (
      <div>
        <div id="header">
          <div id="title">
            <h1>Historic CryptoData</h1>
            <h3> From {start} to {end}</h3>
          </div>
        </div>
        <div id="picker">
          <div id="datePicker">
            <PickDate
              setDate={this.setDate}
              setFocus={this.setFocus}
              focus={focus}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div id="currencyPicker">
            <CurrencyPicker
              currencyOptions={currencyOptions}
              setCurrency={this.setCurrency}
            />
          </div>
          <div id="makeCall">
            <div id="submit" onClick={this.getDataGivenConstraints}> Get Data </div>
          </div>
        </div>
        <div>
          <Chart
            historicCryptoData={historicCryptoData}
            selectedCurrency={selectedCurrency}
          />
        </div>
      </div>
    );
  }
};

export default App;
