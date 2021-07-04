import { message } from 'antd';
import { Actions, actionTypes } from '../..';
import API from '../../../API';
import type { Dispatch } from '../../reducers';

export const logout = () : any => ({
  type: actionTypes.LOGOUT
});

export const loginFailure = () : any => {
  message.error('That email and password combination is incorrect');
  return {
    type: actionTypes.LOGIN_FAILURE
  };
};

export const loginSuccess = (jwt: string) : any => ({
  type: actionTypes.LOGIN_SUCCESS,
  jwt
});

export type LoginAction = { email: string, password: string };
export const login = ({ email, password }: LoginAction) : any => (
  dispatch: Dispatch
) =>
  API.session
    .login({ email, password })
    .then(res => {
      const { jwt } = res.data;
      dispatch(loginSuccess(jwt));
      dispatch(Actions.users.getCurrentUser());
    })
    .catch(() => {
      dispatch(loginFailure());
    });
