import React from 'react';

import moment from 'moment';
import { DatePicker } from 'antd';

const DateFilter = () : React$Element<any> => (
  <DatePicker
    //value={moment(value, format).isValid() ? moment.utc(value, format) : null}
    //format={format}
    //onChange={date => (date ? onChange(date.toISOString()) : onChange(null))}
    //{...(rest: $Rest<Object, DatePickerProps>)}
  />
);

export default DateFilter;
