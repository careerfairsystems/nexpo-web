import type { Dispatch } from 'redux';
import { message } from 'antd';

import { actionTypes } from '../..';
import API from '../../../API';

export const updateCurrentCompanyIsLoading = () : any => ({
  type: actionTypes.PUT_CURRENT_COMPANY
});

export const updateCurrentCompanySuccess = (company: {}) : any => {
  message.success('Your company was successfully updated');
  return {
    type: actionTypes.PUT_CURRENT_COMPANY_SUCCESS,
    company
  };
};

export const updateCurrentCompanyFailure = () : any => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_CURRENT_COMPANY_FAILURE
  };
};

export const updateCurrentCompany = (data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateCurrentCompanyIsLoading());
    return API.companies
      .updateMyCompany(data)
      .then(company => {
        dispatch(updateCurrentCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(updateCurrentCompanyFailure());
      });
  };
}
