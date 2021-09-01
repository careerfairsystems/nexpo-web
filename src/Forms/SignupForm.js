import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField, { required } from './helper';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>,
  submitting: boolean
};
const SignupForm = ({ handleSubmit, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <div style={{marginTop:'1.5rem'}}>
      <Field
        name="email"
        label="Email"
        component={TextInput}
        type="email"
        required
        autoFocus
        validate={[required]}
      />
    </div>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        style={{ marginTop: '1.5rem' }}
        disabled={submitting}
        type="primary"
        htmlType="submit"
      >
        Sign Up
      </Button>
    </div>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.SignupForm
});

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'signup' })(SignupForm)
);

export default stateful;
