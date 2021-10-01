import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form/lib/types.js.flow';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Button, Input, Divider } from 'antd';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import makeField, { required } from './helper';
import UploadButton from './UploadButton';
import DynamicTimeSlots from './DynamicTimeSlots';
import './Styles/CompanyForm.scss';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

type Props = {
  onCancel?: Event => any,
  formState: { values: any }
} & FormProps;

const CompanyForm = ({
  handleSubmit,
  onCancel,
  submitting,
  formState
}: Props) => (
  <Form onSubmit={handleSubmit}>
    <section className="CompanyForm">
      <div className="field">
        <span>Name: </span>
        <Field
          name="name"
          width="140rem"
          component={TextInput}
          validate={required}
          required
        />
      </div>
      <div className="field">
        <span>Website: </span>
        <Field
          name="website"
          component={TextInput}
          validate={required}
          required
        />
      </div>
      <div className="field">
        <span>Description:</span>
        <Field
          name="description"
          component={TextArea}
          validate={required}
          required
        />
      </div>
      <div>
        <Field
          label="Logo :"
          name="logoUrl"
          accept=".jpg,.jpeg,.gif,.png"
          component={UploadButton}
        />
      </div>
    </section>
    <Divider />
    <section className="CompanyForm-time-slots">
      <h3>Student Session Time Slots</h3>
      <FieldArray
        name="studentSessionTimeSlots"
        component={DynamicTimeSlots}
        fieldValues={formState.values}
      />
      {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    </section>
    <Divider />
    <Button disabled={submitting} htmlType="submit" type="primary">
      Submit Company
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

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'company' })(CompanyForm)
);

export default stateful;
