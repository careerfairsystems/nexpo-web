import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField from './helper';
import './Styles/MailtemplateForm.scss';

const TextInput = makeField(Input);
const TextArea = makeField(Input.TextArea);

type Props = {
  handleSubmit: () => Promise<void>
};

const MailtemplateForm = ({ handleSubmit }: Props) => (
  <Form onSubmit={handleSubmit}>
    <div className="MailtemplateForm">
      <div className="field">
        <span>Name:</span>
        <Field name="name" className="input" component={TextInput} />
      </div>
      <div className="field">
        <span>Subject:</span>
        <Field name="subject" className="input" component={TextInput} />
      </div>
      <div className="field">
        <span>Content:</span>
        <Field name="content" className="input" component={TextArea} />
      </div>
      <div className="field">
        <span>Signature:</span>
        <Field name="signature" className="input" component={TextArea} />
      </div>
    </div>
    <Button type="primary" htmlType="submit">
      Create template
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  formState: state.form.MailtemplateForm
});

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'mailtemplate' })(MailtemplateForm)
);

export default stateful;
