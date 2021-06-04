import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const getCurrentUserIsLoading = () : any => ({
  type: actionTypes.FETCH_CURRENT_USER
});

export const getCurrentUserSuccess = (user: {}) : any => ({
  type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
  user
});

export const getCurrentUserFailure = () : any => {
  message.warning('Unauthorized, please log in');
  return {
    type: actionTypes.FETCH_CURRENT_USER_FAILURE
  };
};

export const getCurrentUser = () : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getCurrentUserIsLoading());
    return API.users
      .getMe()
      .then(user => {
        dispatch(getCurrentUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(getCurrentUserFailure());
      });
  };
}
