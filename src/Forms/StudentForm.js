import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isNil, map } from 'lodash/fp';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select } from 'antd';
import './StudentForm.css';

import makeField from './helper';
import UploadButton from './UploadButton';

const TextInput = makeField(Input);
const FieldSelect = makeField(Select);

const interestsValues = [
  { id: 1, name: 'Foreign Opportunity' },
  { id: 2, name: 'Internship' },
  { id: 3, name: 'Part-time job' },
  { id: 4, name: 'Summer job' },
  { id: 5, name: 'Thesis' },
  { id: 6, name: 'Trainee employment' },
  { id: 7, name: 'Full-time job' }
];

const renderInterestItem = (interest: { id: number, name: string }) => (
  <Select.Option key={interest.id} value={interest.id}>
    {interest.name}
  </Select.Option>
);

type ProgrammeItem = {
  id: number,
  name: string,
  code: string
};

const renderProgrammeItem = (programme: ProgrammeItem): React$Element<any> => (
  <Select.Option key={programme.id} value={programme.id}>
    {programme.name} - {programme.code}
  </Select.Option>
);

type Props = {
  initialValues: {
    resumeEnUrl?: {
      name?: string,
      url?: string
    },
    resumeSvUrl: {
      name?: string,
      url?: string
    }
  },
  handleSubmit: () => Promise<void>,
  programmes: ProgrammeItem[],
  pristine: boolean
};

const StudentForm = ({
  handleSubmit,
  pristine,
  programmes
}: Props): React$Element<any> => (
  <Form onSubmit={handleSubmit}>
    <div className="student-input-component">
      Graduation Year:
      <Field
        name="year"
        component={TextInput}
        style={{ width: '75px' }}
        placeholder="..."
      />
    </div>
    <div className="student-input-component">
      Educational programme:
      <Field
        name="programme"
        showSearch
        format={null}
        optionFilterProp="children"
        component={FieldSelect}
        style={{ width: '125px' }}
        placeholder="Choose..."
      >
        {map(renderProgrammeItem, programmes)}
      </Field>
    </div>
    <div className="student-input-component">
      Master’s Degree
      <Field
        name="master"
        component={TextInput}
        style={{ width: '650px' }}
        placeholder="Type here..."
      />
    </div>
    <div className="student-input-component">
      Interests:
      <Field
        name="interests"
        mode="multiple"
        format={null}
        optionFilterProp="children"
        component={FieldSelect}
        style={{ width: '650px' }}
        placeholder="Choose from the list..."
      >
        {map(renderInterestItem, interestsValues)}
      </Field>
    </div>
    <div className="student-input-component">
      LinkedIn URL:
      <Field name="linkedIn" component={TextInput} style={{ width: '450px' }} placeholder="Type here..."/>
    </div>
    <div className="student-input-component">
      Swedish CV:
      <Field name="resumeSvUrl" accept=".pdf" component={UploadButton} />
    </div>
    <div className="student-input-component">
      English CV:
      <Field name="resumeEnUrl" accept=".pdf" component={UploadButton} />
    </div>
    <Button
      type="primary"
      disabled={pristine}
      htmlType="submit"
      style={{ marginTop: '0.75rem' }}
    >
      Submit Student Information
    </Button>
  </Form>
);

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const {
    programme: currentProgramme,
    interests: currentInterests,
    resumeSvUrl: currentResumeSvUrl,
    resumeEnUrl: currentResumeEnUrl
  } = initialValues;

  let programme = null;
  if (!isNil(currentProgramme)) programme = currentProgramme.id;

  let interests = null;
  if (!isNil(currentInterests)) interests = currentInterests.map(v => v.id);

  let resumeSvUrl = null;
  if (!isNil(currentResumeSvUrl))
    resumeSvUrl = { uid: '-1', name: 'Swedish CV', url: currentResumeSvUrl };

  let resumeEnUrl = null;
  if (!isNil(currentResumeEnUrl))
    resumeEnUrl = { uid: '-1', name: 'English CV', url: currentResumeEnUrl };

  return {
    programmes: state.entities.programmes,
    initialValues: {
      ...initialValues,
      resumeSvUrl,
      resumeEnUrl,
      programme,
      interests
    },
    formState: state.form.StudentForm
  };
};

const stateful: any = connect(mapStateToProps)(
  reduxForm({
    form: 'student',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(StudentForm)
);

export default stateful;
