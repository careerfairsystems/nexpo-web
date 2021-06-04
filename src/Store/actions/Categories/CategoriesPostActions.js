import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const createCategoryIsLoading = () : any => ({
  type: actionTypes.POST_CATEGORY
});

export const createCategorySuccess = (category: {}) : any => {
  message.success('Category successfully created');
  return {
    type: actionTypes.POST_CATEGORY_SUCCESS,
    category
  };
};

export type CreateCategoryFailureAction = {
  type: string
};
export const createCategoryFailure = (): CreateCategoryFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.POST_CATEGORY_FAILURE
  };
};

export const createCategory = (data: {}) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(createCategoryIsLoading());
    return API.categories
      .create(data)
      .then(category => {
        dispatch(createCategorySuccess(category.data));
      })
      .catch(() => {
        dispatch(createCategoryFailure());
      });
  };
}
