import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteStudentSessionApplIsLoading = () : any => ({
  type: actionTypes.DELETE_STUDENT_SESSION_APPL
});

export const deleteStudentSessionApplSuccess = (id: string) : any => {
  message.success('Your Application was successfully deleted.');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_SUCCESS,
    id
  };
};

export type deleteStudentSessionApplFailureAction = {
  type: string
};
export const deleteStudentSessionApplFailure = (): deleteStudentSessionApplFailureAction => {
  message.warning('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_STUDENT_SESSION_APPL_FAILURE
  };
};

export const deleteStudentSessionAppl = (id: string) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteStudentSessionApplIsLoading());
    return API.studentSessions
      .deleteAppl(id)
      .then(() => {
        dispatch(deleteStudentSessionApplSuccess(id));
      })
      .catch(() => {
        dispatch(deleteStudentSessionApplFailure());
      });
  };
}
