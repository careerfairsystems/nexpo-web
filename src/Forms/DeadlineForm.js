import React from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FieldProps } from 'redux-form/es/FieldProps.types.js.flow';

import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import DatePicker from '../Components/DatePicker';
import type { DatePickerProps } from '../Components/DatePicker';
import './Styles/DeadlineForm.scss';
import InvisibleLink from '../Components/InvisibleLink';

import makeField from './helper';

type DateProps = FieldProps & DatePickerProps & {||};

const TextInput = makeField(Input);
const MyDatePicker = makeField((props: DateProps) =>
  DatePicker({ showTime: true, format: 'YYYY-MM-DD HH:mm', ...props })
);

type Props = {
  handleSubmit: () => Promise<void>
};
const DeadlineForm = ({ handleSubmit }: Props) => (
  <Form onSubmit={handleSubmit}>
    <div className="DeadlineForm">
      <div className="field">
        <span>Name:</span>
        <Field name="name" style={{ width: 450 }} component={TextInput} />
      </div>
      <div className="time">
        <span>Start Time:</span>
        <Field name="start" component={MyDatePicker} />
      </div>
      <div className="time">
        <span>End Time:</span>
        <Field name="end" component={MyDatePicker} />
      </div>
    </div>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.DeadlineForm
});

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'deadline' })(DeadlineForm)
);

export default stateful;
