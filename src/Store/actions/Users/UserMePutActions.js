import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentUserIsLoading = () : any => ({
  type: actionTypes.PUT_CURRENT_USER
});

export const updateCurrentUserSuccess = (user: {}) : any => {
  message.success('Your profile was successfully updated');
  return {
    type: actionTypes.PUT_CURRENT_USER_SUCCESS,
    user
  };
};

export const updateCurrentUserFailure = () : any => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_CURRENT_USER_FAILURE
  };
};

export const updateCurrentUser = (data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateCurrentUserIsLoading());
    return API.users
      .updateMe(data)
      .then(user => {
        dispatch(updateCurrentUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(updateCurrentUserFailure());
      });
  };
}
