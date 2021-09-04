import React, { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import API from '../../../../API';
import SignupForm from '../../../../Forms/SignupForm';
import SuccessMessage from '../../../../Components/SuccessMessage';

/**
 * Component which allows user to initiate a sign up process
 */

type Props = {
  finished?: boolean
};

const InitialSignup = ({ finished }: Props): React$Element<any> => {
  const [state, setState] = useState({ finished });

  const signup = (values: { email: string }) => {
    const { email } = values;
    return API.signup
      .initialSignup(email)
      .then(() => setState({ finished: true }))
      .catch(err => {
        throw new SubmissionError({ ...err.errors });
      });
  };

  if (state.finished) {
    return <SuccessMessage message="Please check your inbox" />;
  }
  return (
    <div className="initial-signup">
      <h1 style={{ fontSize: '22px' }}>Sign Up</h1>
      <h1>Please enter your email</h1>
      <SignupForm onSubmit={signup} />
      <div style={{ marginTop: '3rem' }}>
        Already have an account?
        <br />
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default InitialSignup;
