import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField, { required } from './helper';
import './LoginForm.css';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>,
  submitting: boolean
};

const ProductionLoginForm = ({ handleSubmit, submitting }: Props) => (
  <Form onSubmit={handleSubmit} className="login-input-form">
    <div className="login-input-component">
      <span style={{textAlign:'center'}}>Email:</span>
      <Field
        name="email"
        component={TextInput}
        type="email"
        required
        autoFocus
        validate={[required]}
        style={{ width: '300px'}}
      />
    </div>

    <div className="login-input-component">
      Password:
      <Field
        name="password"
        component={TextInput}
        type="password"
        required
        validate={[required]}
        style={{ width: '300px' }}
      />
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
      <Button disabled={submitting} type="primary" htmlType="submit">
        Login
      </Button>
    </div>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.ProductionLoginForm
});

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'productionLogin' })(ProductionLoginForm)
);

export default stateful;
