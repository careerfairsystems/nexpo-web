import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField, { required, validatePassword } from './helper';

const TextInput = makeField(Input);
type Props = {
  handleSubmit: () => Promise<void>,
  submitting: boolean
};
const ForgotPasswordForm = ({ handleSubmit, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      component={TextInput}
      type="email"
      required
      autoFocus
      validate={[required]}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Send email
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.ForgotPasswordForm
});

const stateful : any = connect(mapStateToProps)(
  reduxForm({ form: 'forgotPassword', validate: validatePassword })(
    ForgotPasswordForm
  )
);

export default stateful;
