import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateStudentSessionApplIsLoading = () : any => ({
  type: actionTypes.PUT_STUDENT_SESSION_APPL
});

export const updateStudentSessionApplSuccess = (sessionApplication: {}) : any => {
  message.success('Your Application was successfully updated.');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_APPL_SUCCESS,
    sessionApplication
  };
};

export type UpdateStudentSessionApplFailureAction = {
  type: string
};
export const updateStudentSessionApplFailure = (): UpdateStudentSessionApplFailureAction => {
  message.warning('Your Application could not be saved');
  return {
    type: actionTypes.PUT_STUDENT_SESSION_APPL_FAILURE
  };
};

export const updateStudentSessionAppl = (id: string, data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateStudentSessionApplIsLoading());
    return API.studentSessions
      .updateAppl(id, data)
      .then(application => {
        dispatch(updateStudentSessionApplSuccess(application.data));
      })
      .catch(() => {
        dispatch(updateStudentSessionApplFailure());
      });
  };
}
