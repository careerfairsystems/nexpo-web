import type { Dispatch } from 'redux';
import { SubmissionError } from 'redux-form';
import { actionTypes } from '../..';
import API from '../../../API';
import ApiError from '../../../Errors/ApiError';

export const forgotPasswordRequest = () : any => ({
  type: actionTypes.FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccess = () : any => ({
  type: actionTypes.FORGOT_PASSWORD_SUCCESS
});

export type ForgotPasswordAction = {
  email: string
};
export const forgotPassword = ({ email }: ForgotPasswordAction) : any => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch(forgotPasswordRequest());
  return API.session.forgotPassword({ email }).then(() => {
    dispatch(forgotPasswordSuccess());
  });
};

export const verifyForgotPasswordKeyRequest = () : any => ({
  type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_REQUEST
});

export const verifyForgotPasswordKeySuccess = () : any => ({
  type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_SUCCESS
});

export const verifyForgotPasswordKeyFailure = () : any => ({
  type: actionTypes.VERIFY_FORGOT_PASSWORD_KEY_FAILURE
});

export type VerifyForgotPasswordKeyAction = {
  key: string
};
export const verifyForgotPasswordKey = ({
  key
}: VerifyForgotPasswordKeyAction) : any => (dispatch: Dispatch<{ type: string }>) => {
  dispatch(verifyForgotPasswordKeyRequest());
  return API.session
    .verifyForgotPasswordKey({ key })
    .then(() => {
      dispatch(verifyForgotPasswordKeySuccess());
    })
    .catch(() => {
      dispatch(verifyForgotPasswordKeyFailure());
    });
};

export const replaceForgottenPasswordRequest = () : any => ({
  type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_REQUEST
});

export const replaceForgottenPasswordSuccess = () : any => ({
  type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_SUCCESS
});

export type ReplaceForgottenPasswordFailureAction = {
  type: string,
  errors: {}
};
export const replaceForgottenPasswordFailure = (
  errors?: {} = {}
): ReplaceForgottenPasswordFailureAction => ({
  type: actionTypes.REPLACE_FORGOTTEN_PASSWORD_FAILURE,
  errors
});

export type ReplaceForgottenPasswordAction = {
  key: string,
  password: string,
  passwordConfirmation: string
};
export const replaceForgottenPassword = ({
  key,
  password,
  passwordConfirmation
}: ReplaceForgottenPasswordAction) : any => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch(replaceForgottenPasswordRequest());
  return API.session
    .replaceForgottenPassword({
      key,
      password,
      passwordConfirmation
    })
    .then(() => {
      dispatch(replaceForgottenPasswordSuccess());
    })
    .catch((error: ApiError) => {
      const { errors } = error;
      dispatch(replaceForgottenPasswordFailure(errors));
      if (errors)
        throw new SubmissionError({
          password: errors.password,
          passwordConfirmation: errors.passwordConfirmation
        });
    });
};
