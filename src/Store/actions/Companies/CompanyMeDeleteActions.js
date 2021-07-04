import type { Dispatch } from 'redux';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteCurrentCompanyIsLoading = () : any => ({
  type: actionTypes.DELETE_CURRENT_COMPANY
});

export const deleteCurrentCompanySuccess = () : any => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_SUCCESS
});

export const deleteCurrentCompanyFailure = () : any => ({
  type: actionTypes.DELETE_CURRENT_COMPANY_FAILURE
});

export const deleteCurrentCompany = () : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteCurrentCompanyIsLoading());
    return API.companies
      .deleteMyCompany()
      .then(() => {
        dispatch(deleteCurrentCompanySuccess());
      })
      .catch(() => {
        dispatch(deleteCurrentCompanyFailure());
      });
  };
}
