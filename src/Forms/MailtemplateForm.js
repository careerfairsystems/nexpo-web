import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField from './helper';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

type Props = {
  handleSubmit: () => Promise<void>
};

const MailtemplateForm = ({ handleSubmit }: Props) => (
  <Form onSubmit={handleSubmit}>
    <Field name="name" label="Name:" component={TextInput} />
    <Field
      name="subject"
      label="Subject:"
      component={TextInput}
      prefix={<MailOutlined />}
    />
    <Field name="content" label="Content:" component={TextArea} />
    <Field name="signature" label="Signature:" component={TextArea} />
    <Button htmlType="submit">Create template</Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.MailtemplateForm
});

const stateful : any = connect(mapStateToProps)(reduxForm({ form: 'mailtemplate' })(MailtemplateForm));

export default stateful;
