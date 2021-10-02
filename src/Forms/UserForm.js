import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField, { required } from './helper';
import './Styles/UserForm.scss';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

type Props = {
  handleSubmit: () => Promise<void>,
  pristine: boolean
};
const UserForm = ({ handleSubmit, pristine }: Props) => (
  <Form onSubmit={handleSubmit}>
    <h1>Edit User </h1>
    <section className="UserForm">
      <div className="field">
        <span>First Name:</span>
        <Field
          name="firstName"
          className="small-input"
          placeholder="Type here..."
          component={TextInput}
          validate={required}
          required
        />
      </div>
      <div className="field">
        <span>Last Name:</span>
        <Field
          name="lastName"
          className="small-input"
          placeholder="Type here..."
          component={TextInput}
          validate={required}
          required
        />
      </div>
      <div className="field">
        <span>Phone Number:</span>
        <Field
          name="phoneNumber"
          className="small-input"
          placeholder="Type here..."
          component={TextInput}
          validate={required}
          required
        />
      </div>
      <div className="field">
        <span>Food Preferences:</span>
        <Field
          name="foodPreferences"
          className="large-input"
          placeholder="Type here..."
          component={TextArea}
        />
      </div>
    </section>
      <Button type="primary" disabled={pristine} htmlType="submit">
        Submit
      </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.UserForm
});

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'user' })(UserForm)
);

export default stateful;
