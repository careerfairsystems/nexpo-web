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
const ReplacePasswordForm = ({ handleSubmit, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="password"
      label="Password"
      component={TextInput}
      type="password"
      required
      autoFocus
      validate={[required]}
    />
    <Field
      name="passwordConfirmation"
      label="Confirm new Password"
      component={TextInput}
      type="password"
      required
      validate={[required]}
    />
    <Button disabled={submitting} type="primary" htmlType="submit">
      Update password
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.ReplacePasswordForm
});

const stateful : any = connect(mapStateToProps)(
  reduxForm({ form: 'replacePassword', validate: validatePassword })(
    ReplacePasswordForm
  )
);

export default stateful;
