import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import makeField from './helper';
import UploadButton from './UploadButton';

import './Styles/CurrentUserForm.scss';

const TextInput = makeField(Input);

type Props = {
  handleSubmit: () => Promise<void>,
  pristine: boolean,
  submitting: boolean
};

const CurrentUserForm = ({ handleSubmit, pristine, submitting }: Props) => (
  <Form onSubmit={handleSubmit}>
    <div className="user-input">
      Phone Number:
      <Field
        name="phoneNumber"
        className="phone-number-input"
        component={TextInput}
        type="number"
        placeholder="Enter your number..."
      />
    </div>
    <div className="user-input">
      Profile Image:
      <Field
        name="profileImage"
        accept=".jpg,.jpeg,.gif,.png"
        component={UploadButton}
      />
    </div>
    <Button
      type="primary"
      disabled={pristine || submitting}
      htmlType="submit"
      style={{ marginTop: '0.75rem' }}
    >
      Submit User Information
    </Button>
  </Form>
);

const mapStateToProps = (state, props) => {
  const { initialValues = {} } = props;
  const { profileImage: currentProfileImage } = initialValues;

  let profileImage = null;
  if (!isNil(currentProfileImage))
    profileImage = {
      uid: '-1',
      name: 'profileImage',
      url: currentProfileImage
    };

  return {
    initialValues: { ...initialValues, profileImage },
    formState: state.form.CurrentCompanyForm
  };
};

const stateful: any = connect(mapStateToProps)(
  reduxForm({ form: 'currentUser' })(CurrentUserForm)
);

export default stateful;
