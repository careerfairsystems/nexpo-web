import React from 'react';

import moment from 'moment';
import { DatePicker } from 'antd';

const DateFilter = ({
  onChange,
  value,
  format,
}) => {
  return (
    <DatePicker
      format={format}
      defaultValue=''
      onChange={onChange}
      showToday
    />
  )
};

export default DateFilter;
