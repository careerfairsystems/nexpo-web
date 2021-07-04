import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateDeadlineIsLoading = () : any => ({
  type: actionTypes.PUT_DEADLINE
});

export const updateDeadlineSuccess = (deadline: {}) : any => {
  message.success('Deadline successfully updated');
  return {
    type: actionTypes.PUT_DEADLINE_SUCCESS,
    deadline
  };
};

export type UpdateDeadlineFailureAction = {
  type: string
};
export const updateDeadlineFailure = (): UpdateDeadlineFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_DEADLINE_FAILURE
  };
};

export const updateDeadline = (id: string, data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateDeadlineIsLoading());
    return API.deadlines
      .update(id, data)
      .then(deadline => {
        dispatch(updateDeadlineSuccess(deadline.data));
      })
      .catch(() => {
        dispatch(updateDeadlineFailure());
      });
  };
}
