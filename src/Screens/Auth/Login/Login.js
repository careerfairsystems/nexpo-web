import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import type { Location } from 'react-router-dom';

import HtmlTitle from '../../../Components/HtmlTitle';
import LoginForm from '../../../Forms/LoginForm';
/**
 * Handles login in production. Supports redirecting back to the route that redirected here
 *
 * This is not integrated with rest of application as there are another pull request touching state
 * - It can authenticate a user, it simply needs to be integrated into global state
 * - By passing isAuthenticated prop, this component will redirect back to where user came from
 */
type Props = {
  location: Location,
  isLoggedIn: boolean,
  login: ({ email: string, password: string }) => Promise<void>
};

const Login = ({ location, isLoggedIn, login }: Props): React$Element<any> => {
  // Url that redirected here
  const { from } = location.state || { from: { pathname: '/' } };

  if (isLoggedIn) {
    return <Redirect to={from} />;
  }

  return (
    <div className="production-login">
      <HtmlTitle title="Login" />
      <div>
        <div
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <h1>Login</h1>
        </div>
        <div>
          <LoginForm onSubmit={login} />
        </div>
      </div>

      <div
        className="existing-account"
        style={{
          display: 'grid',
          gridTemplateRows: '1fr 1fr 1fr',
          justifyContent: 'left',
          marginTop: '1rem'
        }}
      >
        <span>Hard time logging in?</span>
        <Link to="/signup">Sign up</Link>
        <Link to="/forgot-password">Forgot password</Link>
      </div>
    </div>
  );
};

export default Login;
