import type { Dispatch } from 'redux';
import { actionTypes } from '../..';
import API from '../../../API';

export const getCurrentCompanyIsLoading = () : any => ({
  type: actionTypes.FETCH_CURRENT_COMPANY
});

export const getCurrentCompanySuccess = (company: {}) : any => ({
  type: actionTypes.FETCH_CURRENT_COMPANY_SUCCESS,
  company
});

export const getCurrentCompanyFailure = () : any => ({
  type: actionTypes.FETCH_CURRENT_COMPANY_FAILURE
});

export const getCurrentCompany = () : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getCurrentCompanyIsLoading());
    return API.companies
      .getMyCompany()
      .then(company => {
        dispatch(getCurrentCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(getCurrentCompanyFailure());
      });
  };
}
