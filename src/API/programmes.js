/*
 *   This file contains methods to access the /programmes resource on the server.
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
   * Create a Programme
   */
  create: (data: {}): Promise<any> =>
    authPost('/api/programmes', data).then(handleHttpResponse),

  /**
   * Fetches all programmes
   */
  getAll: (): Promise<any> =>
    authFetch('/api/programmes').then(handleHttpResponse),

  /**
   * Fetches a Programme
   */
  get: (id: string): Promise<any> =>
    authFetch(`/api/programmes/${id}`).then(handleHttpResponse),

  /**
   * Updates a Programme
   */
  update: (id: string, data: {}): Promise<any> =>
    authPut(`/api/programmes/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a Programme
   */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/programmes/${id}`).then(handleHttpResponse)
};
