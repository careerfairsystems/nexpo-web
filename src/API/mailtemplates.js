/*
 *   This file contains methods to access the /mailtemplates resource on the server.
 */

import {
  authPost,
  authFetch,
  authPut,
  authDelete,
  handleHttpResponse
} from './utils';

export default {
  /**
   * Create a mail template
   */
  create: (data: {}): Promise<any> =>
    authPost('/api/mailtemplates', data).then(handleHttpResponse),

  /**
   * Fetches all mailtemplates
   */
  getAll: (): Promise<any> =>
    authFetch('/api/mailtemplates').then(handleHttpResponse),

  /**
   * Fetches a mail template
   */
  get: (id: string): Promise<any> =>
    authFetch(`/api/mailtemplates/${id}`).then(handleHttpResponse),

  /**
   * Updates a mail template
   */
  update: (id: string, data: {}): Promise<any> =>
    authPut(`/api/mailtemplates/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a mail template
   */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/mailtemplates/${id}`).then(handleHttpResponse)
};
