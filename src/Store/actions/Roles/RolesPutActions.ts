import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateRoleIsLoading = () => ({
  type: actionTypes.PUT_ROLE,
});

export const updateRoleSuccess = (role: Record<string, unknown>) => {
  message.success('Role successfully updated');
  return {
    type: actionTypes.PUT_ROLE_SUCCESS,
    role,
  };
};

export type UpdateRoleFailureAction = {
  type: string;
};
export const updateRoleFailure = (): UpdateRoleFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_ROLE_FAILURE,
  };
};

export const updateRole =
  (id: string, data: Record<string, unknown>) =>
  (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateRoleIsLoading());
    return API.roles
      .update(id, data)
      .then((role) => {
        dispatch(updateRoleSuccess(role.data));
      })
      .catch(() => {
        dispatch(updateRoleFailure());
      });
  };
