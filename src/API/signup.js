import { handleHttpResponse, authPost, fetchJson } from './utils';
import 'whatwg-fetch'; // fetch polyfill for unsupported browsers

type finalSignupBody = {
  password: string,
  passwordConfirmation: string,
  firstName: string,
  lastName: string
};

export default {
  /**
   * Initiates a signup
   */
  initialSignup: (email: string): Promise<any> =>
    fetchJson('/api/initial_signup', { data: { email }, method: 'POST' }).then(
      handleHttpResponse
    ),

  /**
   * Initiates a representative signup
   */
  initialRepresentativeSignup: (data: {}): Promise<any> =>
    authPost('/api/initial_representative_signup', data),

  /**
   * Initiates a representative signup for a co-worker
   */
  inviteRepresentative: (data: {}): Promise<any> =>
    authPost('/api/me/company/invite_representative', data),

  /**
   * Gets an ongoing signup process
   */
  getCurrentSignup: (signupKey: string): Promise<any> =>
    fetch(`/api/initial_signup/${signupKey}`).then(handleHttpResponse),

  finalizeSignup: (signupKey: string, body: finalSignupBody): Promise<any> =>
    fetchJson(`/api/final_signup/${signupKey}`, {
      data: body,
      method: 'POST'
    }).then(handleHttpResponse)
};
