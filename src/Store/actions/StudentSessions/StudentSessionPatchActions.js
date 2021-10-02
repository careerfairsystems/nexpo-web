import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export function createBulkStudentSessionsIsLoading() : any {
  return {
    type: actionTypes.POST_BULK_STUDENT_SESSION
  };
}

export function createBulkStudentSessionsSuccess(studentSessions: {}) : any {
  message.success('Multiple Student Sessions was successfully bulk created.');
  return {
    type: actionTypes.POST_BULK_STUDENT_SESSION_SUCCESS,
    studentSessions
  };
}

export type CreateBulkStudentSessionsFailureAction = {
  type: string
};
export function createBulkStudentSessionsFailure(): CreateBulkStudentSessionsFailureAction {
  message.warning('Multiple Student Sessions could not be bulk created');

  return {
    type: actionTypes.POST_BULK_STUDENT_SESSION_FAILURE
  };
}

export const createBulkStudentSessions = () : any => {
  return (dispatch: Dispatch) => {
    dispatch(createBulkStudentSessionsIsLoading());
    return API.studentSessions
      .createBulk()
      .then(studentSessions => {
        dispatch(createBulkStudentSessionsSuccess(studentSessions.data));
      })
      .catch(() => {
        dispatch(createBulkStudentSessionsFailure());
      });
  };
}
