/*
 *   This file contains methods to access the /users resource on the server.
 */

import {
  authPost,
  authFetch,
  authPut,
  authFormPut,
  authDelete,
  handleHttpResponse
} from './utils';

export default {
  /**
   * Fetches the current user
   */
  getMe: (): Promise<any> => authFetch('/api/me').then(handleHttpResponse),

  /**
   * Updates the current user
   */
  updateMe: (data: {}): Promise<any> =>
    authFormPut('/api/me', data).then(handleHttpResponse),

  /**
   * Delete the current user
   */
  deleteMe: (): Promise<any> => authDelete('/api/me').then(handleHttpResponse),

  /**
   * Updates the current user's student
   */
  updateMyStudent: (data: {}): Promise<any> =>
    authFormPut('/api/me/student', data).then(handleHttpResponse),

  /**
   * Create a user
   */
  create: (data: {}): Promise<any> =>
    authPost('/api/users', data).then(handleHttpResponse),

  /**
   * Fetches all users
   */
  getAll: (): Promise<any> => authFetch('/api/users').then(handleHttpResponse),

  /**
   * Fetches a user
   */
  get: (id: string): Promise<any> =>
    authFetch(`/api/users/${id}`).then(handleHttpResponse),

  /**
   * Updates a user
   */
  update: (id: string, data: {}): Promise<any> =>
    authPut(`/api/users/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a user
   */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/users/${id}`).then(handleHttpResponse)
};
