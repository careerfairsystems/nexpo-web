import { handleHttpResponse, authPost, fetchJson } from './utils';
import 'whatwg-fetch'; // fetch polyfill for unsupported browsers

type FinalSignupBody = {
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
};

export default {
  /**
   * Initiates a signup
   */
  initialSignup: (email: string) =>
    fetchJson('/api/initial_signup', { data: { email }, method: 'POST' }).then(
      handleHttpResponse
    ),

  /**
   * Initiates a representative signup
   */
  initialRepresentativeSignup: (data: Record<string, unknown>) =>
    authPost('/api/initial_representative_signup', data),

  /**
   * Initiates a representative signup for a co-worker
   */
  inviteRepresentative: (data: Record<string, unknown>) =>
    authPost('/api/me/company/invite_representative', data),

  /**
   * Gets an ongoing signup process
   */
  getCurrentSignup: (signupKey: string) =>
    fetch(`/api/initial_signup/${signupKey}`).then(handleHttpResponse),

  finalizeSignup: (signupKey: string, body: FinalSignupBody) =>
    fetchJson(`/api/final_signup/${signupKey}`, {
      data: body,
      method: 'POST',
    }).then(handleHttpResponse),
};
