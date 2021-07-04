import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteCurrentUserIsLoading = () : any => ({
  type: actionTypes.DELETE_CURRENT_USER
});

export const deleteCurrentUserSuccess = () : any => {
  message.success('Your account was successfully deleted');
  return {
    type: actionTypes.DELETE_CURRENT_USER_SUCCESS
  };
};

export const deleteCurrentUserFailure = () : any => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_CURRENT_USER_FAILURE
  };
};

export const deleteCurrentUser = () : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteCurrentUserIsLoading());
    return API.users
      .deleteMe()
      .then(() => {
        dispatch(deleteCurrentUserSuccess());
      })
      .catch(() => {
        dispatch(deleteCurrentUserFailure());
      });
  };
}
