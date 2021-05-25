/*
 *   This file contains methods to access the /users resource on the server.
 */

import {
  authPost,
  authFetch,
  authPut,
  authFormPut,
  authDelete,
  handleHttpResponse,
} from './utils';

export default {
  /**
   * Fetches the current user
   */
  getMe: () => authFetch('/api/me').then(handleHttpResponse),

  /**
   * Updates the current user
   */
  updateMe: (data: Record<string, unknown>) =>
    authFormPut('/api/me', data).then(handleHttpResponse),

  /**
   * Delete the current user
   */
  deleteMe: () => authDelete('/api/me').then(handleHttpResponse),

  /**
   * Updates the current user's student
   */
  updateMyStudent: (data: Record<string, unknown>) =>
    authFormPut('/api/me/student', data).then(handleHttpResponse),

  /**
   * Create a user
   */
  create: (data: Record<string, unknown>) =>
    authPost('/api/users', data).then(handleHttpResponse),

  /**
   * Fetches all users
   */
  getAll: () => authFetch('/api/users').then(handleHttpResponse),

  /**
   * Fetches a user
   */
  get: (id: string) => authFetch(`/api/users/${id}`).then(handleHttpResponse),

  /**
   * Updates a user
   */
  update: (id: string, data: Record<string, unknown>) =>
    authPut(`/api/users/${id}`, data).then(handleHttpResponse),

  /**
   * Delete a user
   */
  delete: (id: string) =>
    authDelete(`/api/users/${id}`).then(handleHttpResponse),
};
