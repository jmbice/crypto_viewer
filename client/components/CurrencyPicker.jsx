import React from 'react';
import '../css/currencyPicker.css';

const rightSmallSelectable = {
  marginTop: '10px',
  width: '47.5%',
  fontSize: '14px',
  border: '1px solid #ccc',
  height: '34px',
  marginBottom: '10px',
};

const CurrencyPicker = (props) => {
  const { currencyOptions, setCurrency } = props;
  return (
    <div>
      <div>
        <select onChange={setCurrency} id="selectCurrency">
          <option value={currencyOptions[0]} >
            {currencyOptions[0]}
          </option>
          <option value={currencyOptions[1]} >
            {currencyOptions[1]}
          </option>
          <option value={currencyOptions[2]} >
            {currencyOptions[2]}
          </option>
        </select>
      </div>
    </div>
  );
}

export default CurrencyPicker;
