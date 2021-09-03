import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const updateCompanyIsLoading = () : any => ({
  type: actionTypes.PUT_COMPANY
});

export const updateCompanySuccess = (company: {}) : any => {
  message.success('Company successfully updated');
  return {
    type: actionTypes.PUT_COMPANY_SUCCESS,
    company
  };
};

export type UpdateCompanyFailureAction = {
  type: string
};
export const updateCompanyFailure = (): UpdateCompanyFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.PUT_COMPANY_FAILURE
  };
};

export const updateCompany = (id:string, data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(updateCompanyIsLoading());
    console.log('data', data)
    return API.companies
      .update(id, data)
      .then(company => {
        dispatch(updateCompanySuccess(company.data));
      })
      .catch(() => {
        dispatch(updateCompanyFailure());
      });
  };
}
