import React from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form/lib/types.js.flow';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Select } from 'antd';
import makeField from './helper';

const FieldSelect = makeField(Select);

type Props = {
  options: any
} & FormProps;

const CompanyStudentSessionForm = ({
  handleSubmit,
  submitting,
  options
}: Props) => (
  <Form onSubmit={handleSubmit} layout="inline">
    <Field
      name="studentId"
      component={FieldSelect}
      showSearch
      style={{ width: 200 }}
      filterOption={(inputValue, option) =>
        option.props.children
          .toUpperCase()
          .indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      {options}
    </Field>
    <Button
      disabled={options.length === 0 || submitting}
      htmlType="submit"
      type="primary"
    >
      Assign
    </Button>
  </Form>
);

const mapStateToProps = (state, props) => ({
  formState: state.form[`CompanyStudentSession${props.id}`] || {},
  form: `CompanyStudentSession${props.id}`
});

const stateful : any = connect(mapStateToProps)(
  reduxForm({ enableReinitialize: true })(CompanyStudentSessionForm)
);

export default stateful;
