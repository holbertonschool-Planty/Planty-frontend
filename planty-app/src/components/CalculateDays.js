import React from 'react';
import { addMonths, addDays, format } from 'date-fns';

const DateComponent = (backendResponse) => {
  const last_event_date = backendResponse.notis.last_event_date;
  const frequency = backendResponse.notis.frequency;
  const lastEventDate = new Date(last_event_date);

  const newDate = addDays(lastEventDate, frequency);
  const adjustedDate = newDate.getMonth() !== lastEventDate.getMonth()
    ? addMonths(newDate, 1)
    : newDate;
  const formattedDate = format(adjustedDate, 'yyyy-MM-dd');

  return formattedDate;
};

export default DateComponent;
