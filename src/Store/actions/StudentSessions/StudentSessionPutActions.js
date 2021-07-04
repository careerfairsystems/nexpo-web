import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateStudentSessionIsLoading = () : any => ({
  type: actionTypes.PUT_STUDENT_SESSION
});

export const updateStudentSessionSuccess = (studentSession: {}) : any => {
  message.success('Your Session was successfully updated.');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_SUCCESS,
    studentSession
  };
};

export type UpdateStudentSessionFailureAction = {
  type: string
};
export const updateStudentSessionFailure = (): UpdateStudentSessionFailureAction => {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_FAILURE
  };
};

export const updateStudentSession = (id: string, status: number) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateStudentSessionIsLoading());
    return API.studentSessions
      .updateSession(id, status)
      .then(session => {
        dispatch(updateStudentSessionSuccess(session.data));
      })
      .catch(() => {
        dispatch(updateStudentSessionFailure());
      });
  };
}
