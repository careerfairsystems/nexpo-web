import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form/lib/types.js.flow';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Button, Input } from 'antd';
import {Form} from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import makeField, { required } from './helper';
import UploadButton from './UploadButton';
import DynamicTimeSlots from './DynamicTimeSlots';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

type Props = {
  onCancel?: Event => any,
  formState: {values: any}
} & FormProps;

const CompanyForm = ({
  handleSubmit,
  onCancel,
  submitting,
  formState
}: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      label="Name"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="website"
      label="Website:"
      component={TextInput}
      validate={required}
      required
    />
    <Field
      name="description"
      label="Description:"
      component={TextArea}
      validate={required}
      required
    />
    <Field
      name="logoUrl"
      label="Logo"
      accept=".jpg,.jpeg,.gif,.png"
      component={UploadButton}
    />
    <h3>Student Session Time Slots</h3>
    <FieldArray
      name="studentSessionTimeSlots"
      component={DynamicTimeSlots}
      fieldValues={formState.values}
    />
    {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
);

CompanyForm.defaultProps = {
  onCancel: null,
  formState: {
    values: undefined
  }
};

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const { logoUrl: currentLogoUrl } = initialValues;
  let logoUrl = null;
  if (!isNil(currentLogoUrl))
    logoUrl = { uid: '-1', name: 'Logotype', url: currentLogoUrl };

  return {
    initialValues: {
      ...initialValues,
      date: '2018-11-14',
      startTime: '10:00',
      endTime: '16:00',
      timeslotLength: 30,
      breakLength: 0,
      logoUrl
    },
    formState: state.form.company || {}
  };
};

const stateful : any = connect(mapStateToProps)(reduxForm({ form: 'company' })(CompanyForm));

export default stateful;
