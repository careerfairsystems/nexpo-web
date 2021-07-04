import { fetchJson, handleHttpResponse } from './utils';
import 'whatwg-fetch'; // fetch polyfill for unsupported browsers

export default {
  /**
   * Tries to login
   */
  login: ({
    email,
    password
  }: {
    email: string,
    password: string
  }): Promise<any> =>
    fetchJson('/api/login', { data: { email, password }, method: 'POST' }).then(
      handleHttpResponse
    ),

  /**
   *
   */
  forgotPassword: ({ email }: { email: string }): Promise<any> =>
    fetchJson('/api/password/forgot', { data: { email }, method: 'POST' }).then(
      handleHttpResponse
    ),

  verifyForgotPasswordKey: ({ key }: { key: string }): Promise<any> =>
    fetch(`/api/password/forgot/${key}`).then(handleHttpResponse),

  replaceForgottenPassword: ({
    key,
    password,
    passwordConfirmation
  }: {
    key: string,
    password: string,
    passwordConfirmation: string
  }): Promise<any> =>
    fetchJson(`/api/password/new/${key}`, {
      data: { password, passwordConfirmation },
      method: 'POST'
    }).then(handleHttpResponse)
};
