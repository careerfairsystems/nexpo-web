import { reset } from 'redux-form';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export function createStudentSessionIsLoading() {
  return {
    type: actionTypes.POST_STUDENT_SESSION,
  };
}

export function createStudentSessionSuccess(company: Record<string, unknown>) {
  message.success('Student Session was successfully created.');
  return {
    type: actionTypes.POST_STUDENT_SESSION_SUCCESS,
    company,
  };
}

export type CreateStudentSessionFailureAction = {
  type: string;
};
export function createStudentSessionFailure(): CreateStudentSessionFailureAction {
  message.warning('Student Session could not be created');

  return {
    type: actionTypes.POST_STUDENT_SESSION_FAILURE,
  };
}

export const createStudentSession =
  (data: Record<string, unknown>) => (dispatch: Dispatch) => {
    dispatch(createStudentSessionIsLoading());
    return API.studentSessions
      .create(data)
      .then((company) => {
        dispatch(createStudentSessionSuccess(company.data));
        dispatch(reset('studentSession'));
      })
      .catch(() => {
        dispatch(createStudentSessionFailure());
      });
  };
