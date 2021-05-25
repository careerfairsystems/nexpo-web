import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateMailtemplateIsLoading = () => ({
  type: actionTypes.PUT_MAILTEMPLATE,
});

export const updateMailtemplateSuccess = (
  mailtemplate: Record<string, unknown>
) => {
  message.success('Mailtemplate successfully updated');
  return {
    type: actionTypes.PUT_MAILTEMPLATE_SUCCESS,
    mailtemplate,
  };
};

export type UpdateMailtemplateFailureAction = {
  type: string;
};
export const updateMailtemplateFailure =
  (): UpdateMailtemplateFailureAction => {
    message.error('Something went wrong, please try again later');
    return {
      type: actionTypes.PUT_MAILTEMPLATE_FAILURE,
    };
  };

export const updateMailtemplate =
  (id: string, data: Record<string, unknown>) =>
  (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateMailtemplateIsLoading());
    return API.mailtemplates
      .update(id, data)
      .then((mailtemplate) => {
        dispatch(updateMailtemplateSuccess(mailtemplate.data));
      })
      .catch(() => {
        dispatch(updateMailtemplateFailure());
      });
  };
