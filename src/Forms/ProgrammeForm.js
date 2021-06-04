import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

type Props = {
  disabled?: boolean,
  handleSubmit: () => Promise<void>,
  submitting: boolean
};
const ProgrammeForm = ({ handleSubmit, disabled, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      label="Guild Name"
      component={TextInput}
      disabled={disabled}
    />
    <Field name="code" label="Code" component={TextInput} disabled={disabled} />
    <Button disabled={disabled || submitting} htmlType="submit">
      Submit
    </Button>
  </Form>
);

ProgrammeForm.defaultProps = {
  disabled: false
};

const mapStateToProps = state => ({
  formState: state.form.ProgrammeForm
});

const stateful : any = connect(mapStateToProps)(reduxForm({ form: 'programme' })(ProgrammeForm));

export default stateful;
