/*
 *   This file contains methods to access the /roles resource on the server.
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
   * Create a role
   */
  create: (data: {}): Promise<any> =>
    authPost('/api/roles', data).then(handleHttpResponse),

  /**
   * Fetches all roles
   */
  getAll: (): Promise<any> => authFetch('/api/roles').then(handleHttpResponse),

  /**
   * Fetches a role
   */
  get: (id: string): Promise<any> =>
    authFetch(`/api/roles/${id}`).then(handleHttpResponse),

  /**
   * Updates a role
   */
  update: (id: string, data: {}): Promise<any> =>
    authPut(`/api/roles/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a role
   */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/roles/${id}`).then(handleHttpResponse)
};
