import React from 'react';
import { map } from 'lodash/fp';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Input, Button } from 'antd';
import makeField from './helper';
import { Selectors } from '../Store';
import './Styles/SessionForm.scss';

const InputSelect = makeField(Select);
const TextArea = makeField(Input.TextArea);

const { Option } = Select;

const companyOption = company => (
  <Option key={company.id} value={company.id}>
    {company.name}
  </Option>
);
const requiredCompany = value =>
  value ? undefined : 'Please provide a company';
const requiredMotivation = value =>
  value ? undefined : 'Please provide a motivation';

type Props = {
  availableCompanies: Array<any>,
  handleSubmit: () => Promise<void>,
  submitting: boolean,
  disabled: boolean
};
const StudentSessionForm = ({
  handleSubmit,
  availableCompanies,
  submitting,
  disabled
}: Props) => (
  <Form onSubmit={handleSubmit}>
    <div className="session-field">
      Choose the company you would like to meet
      <Field
        required
        className="session-company"
        name="companyId"
        showSearch
        notFoundContent="You have applied to all available companies"
        optionFilterProp="children"
        validate={requiredCompany}
        component={InputSelect}
      >
        {map(companyOption, availableCompanies)}
      </Field>
    </div>
    <div className="session-field">
      Write a short motivation to why you want to get in contact with the
      company. (Max 400 words)
      <Field
        className="session-motivation"
        name="motivation"
        required
        validate={requiredMotivation}
        component={TextArea}
        maxLength="2400"
        rows={6}
      />
    </div>
    <Button type="primary" disabled={submitting || disabled} htmlType="submit">
      Submit Student Session
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  availableCompanies: Selectors.companies.getNotAppliedTo(state),
  formState: state.form.StudentSessionForm
});

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'studentSession' })(StudentSessionForm)
);

export default stateful;
