import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const PickDate = (props) => {
  const { setDate, setFocus, focus, startDate, endDate } = props;

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId={`${startDate}`}
        endDate={endDate}
        endDateId={`${endDate}`}
        onDatesChange={(startDate, endDate) => {setDate(startDate, endDate)}}
        focusedInput={focus}
        onFocusChange={focusedInput => setFocus(focusedInput)}
        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
      />
    </div>
  );
};

export default PickDate;
