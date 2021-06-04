import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>
};
const InviteForm = ({ handleSubmit }: Props) => (
  <Form onSubmit={handleSubmit} layout="inline">
    <Field
      name="email"
      label="Email:"
      component={TextInput}
      prefix={<MailOutlined />}
      placeholder="Email"
    />
    <Button htmlType="submit">Invite</Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.InviteForm
});

const stateful : any = connect(mapStateToProps)(reduxForm({ form: 'invite' })(InviteForm));

export default stateful;
