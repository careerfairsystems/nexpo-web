/*
 *   This file contains methods to access the /student_sessions resource on the server.
 */

import {
  authPost,
  authPatch,
  authDelete,
  authPut,
  download,
  handleHttpResponse
} from './utils';

export default {
  /** Create a student session */
  create: (data: {}): Promise<any> =>
    authPost('/api/student_sessions', data).then(handleHttpResponse),

  /** Creates multiple student sessions */
  createBulk: (): Promise<any> =>
    authPatch('/api/student_sessions/', {}).then(handleHttpResponse),

  /** Updates a student session */
  update: (id: string, data: {}): Promise<any> =>
    authPut(`/api/student_sessions/${id}`, data).then(handleHttpResponse),

  /** Delete a student session */
  delete: (id: string): Promise<any> =>
    authDelete(`/api/student_sessions/${id}`).then(handleHttpResponse),

  /** Deletes all student session that is not student confirmed */
  deleteNonConfirmed: (): Promise<any> =>
    authDelete('/api/student_sessions').then(handleHttpResponse),

  /** Updates a student session */
  updateSession: (id: string, status: number): Promise<any> =>
    authPut(`/api/me/student_sessions/${id}`, {
      studentSession: { studentSessionStatus: status }
    }).then(handleHttpResponse),

  /** Fetches all reserves for student sessions */
  downloadReserves: (): Promise<void> =>
    download('/api/student_session_reserves', 'reserves.csv'),

  /** Fetches all reserves for student sessions */
  downloadSessionInformation: (): Promise<void> =>
    download('/api/student_session_info', 'student_sessions.csv'),

  /** Create a student session application */
  createAppl: (data: {}): Promise<any> =>
    authPost('/api/student_session_applications', data).then(
      handleHttpResponse
    ),

  /** Update a student session application */
  updateAppl: (id: string, data: {}): Promise<any> =>
    authPut(`/api/me/student_session_applications/${id}`, data).then(
      handleHttpResponse
    ),

  /** Delete a student session application */
  deleteAppl: (id: string): Promise<any> =>
    authDelete(`/api/me/student_session_applications/${id}`).then(
      handleHttpResponse
    )
};
