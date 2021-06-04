import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateMailtemplateIsLoading = () : any => ({
  type: actionTypes.PUT_MAILTEMPLATE
});

export const updateMailtemplateSuccess = (mailtemplate: {}) : any => {
  message.success('Mailtemplate successfully updated');
  return {
    type: actionTypes.PUT_MAILTEMPLATE_SUCCESS,
    mailtemplate
  };
};

export type UpdateMailtemplateFailureAction = {
  type: string
};
export const updateMailtemplateFailure = (): UpdateMailtemplateFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_MAILTEMPLATE_FAILURE
  };
};

export const updateMailtemplate = (id: string, data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateMailtemplateIsLoading());
    return API.mailtemplates
      .update(id, data)
      .then(mailtemplate => {
        dispatch(updateMailtemplateSuccess(mailtemplate.data));
      })
      .catch(() => {
        dispatch(updateMailtemplateFailure());
      });
  };
}
