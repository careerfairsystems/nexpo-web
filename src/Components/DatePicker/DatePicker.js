import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
/**
 * Custom DatePicker that handles the conversion of the moment date value
 */
type Props = {
  value: any,
  onChange: any => void,
  format: string
};
const MyDatePicker = ({
  value,
  onChange,
  format = 'YYYY-MM-DD',
  ...rest
}: Props) : React$Element<any> => (
  <DatePicker
    value={moment(value, format).isValid() ? moment.utc(value, format) : null}
    format={format}
    onChange={date => (date ? onChange(date.toISOString()) : onChange(null))}
    {...(rest: $Rest<Props, any>)}
  />
);

export default MyDatePicker;
