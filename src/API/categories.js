/*
 *   This file contains methods to access the /categories resource on the server.
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
   * Create a category
   */
  create: (data: {}): Promise<any> =>
    authPost('/api/categories', data).then(handleHttpResponse),

  /**
   * Fetches all categories
   */
  getAll: (): Promise<any> =>
    authFetch('/api/categories').then(handleHttpResponse),

  /**
   * Fetches a category
   */
  get: (id: string): Promise<any> =>
    authFetch(`/api/categories/${id}`).then(handleHttpResponse),

  /**
   * Updates a category
   */
  update: (id: string, data: {}): Promise<any> =>
    authPut(`/api/categories/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a category
   */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/categories/${id}`).then(handleHttpResponse)
};
