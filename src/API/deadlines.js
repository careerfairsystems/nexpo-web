/*
 *   This file contains methods to access the /deadlines resource on the server.
 */

import {
  authFormPost,
  authFetch,
  authFormPut,
  authDelete,
  handleHttpResponse
} from './utils';

export default {
  /**
   * Create a deadline
   */
  create: (data: {}): Promise<any> =>
    authFormPost('/api/deadlines', data).then(handleHttpResponse),

  /**
   * Fetches all deadlines
   */
  getAll: (): Promise<any> =>
    authFetch('/api/deadlines').then(handleHttpResponse),

  /**
   * Fetches a deadline
   */
  get: (id: string): Promise<any> =>
    authFetch(`/api/deadlines/${id}`).then(handleHttpResponse),

  /**
   * Updates a deadline
   */
  update: (id: string, data: {}): Promise<any> =>
    authFormPut(`/api/deadlines/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a deadline
   */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/deadlines/${id}`).then(handleHttpResponse)
};
