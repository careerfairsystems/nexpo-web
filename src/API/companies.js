/*
 *   This file contains methods to access the /companies resource on the server.
 */

import {
  authPost,
  authFormPost,
  authFetch,
  authFormPut,
  authDelete,
  handleHttpResponse
} from './utils';

export default {
  /**
   * Fetches the current company
   */
  getMyCompany: (): Promise<any> =>
    authFetch('/api/me/company').then(handleHttpResponse),

  /**
   * Updates the current company
   */
  updateMyCompany: (data: {}): Promise<any> =>
    authFormPut('/api/me/company', data).then(handleHttpResponse),

  /**
   * Removes the current company
   */
  deleteMyCompany: (): Promise<any> =>
    authDelete('/api/me/company').then(handleHttpResponse),

  /**
   * Create a company
   */
  create: (data: {}): Promise<any> =>
    authFormPost('/api/companies', data).then(handleHttpResponse),

  /**
   * Create multiple companies
   */
  createBulk: (data: {}): Promise<any> =>
    authPost('/api/companies/create_bulk', data).then(handleHttpResponse),

  /**
   * Fetches all companies
   */
  getAll: (): Promise<any> =>
    authFetch('/api/companies').then(handleHttpResponse),

  /**
   * Fetches a company
   */
  get: (id: string): Promise<any> =>
    authFetch(`/api/companies/${id}`).then(handleHttpResponse),

  /**
   * Updates a company
   */
  update: (id: string, data: {}): Promise<any> =>
    authFormPut(`/api/companies/${id}`, {company: data}).then(handleHttpResponse),

  /**
   * Delete a company
   */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/companies/${id}`).then(handleHttpResponse)
};
