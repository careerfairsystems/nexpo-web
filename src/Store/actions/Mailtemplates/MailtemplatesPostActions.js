import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const createMailtemplateIsLoading = () : any => ({
  type: actionTypes.POST_MAILTEMPLATE
});

export const createMailtemplateSuccess = (mailtemplate: {}) : any => {
  message.success('Mailtemplate successfully created');
  return {
    type: actionTypes.POST_MAILTEMPLATE_SUCCESS,
    mailtemplate
  };
};

export type CreateMailtemplateFailureAction = {
  type: string
};
export const createMailtemplateFailure = (): CreateMailtemplateFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_MAILTEMPLATE_FAILURE
  };
};

export const createMailtemplate = (data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(createMailtemplateIsLoading());
    return API.mailtemplates
      .create(data)
      .then(mailtemplate => {
        dispatch(createMailtemplateSuccess(mailtemplate.data));
      })
      .catch(() => {
        dispatch(createMailtemplateFailure());
      });
  };
}
