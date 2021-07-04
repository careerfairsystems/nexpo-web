import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';

export const deleteProgrammeIsLoading = () : any => ({
  type: actionTypes.DELETE_PROGRAMME
});

export const deleteProgrammeSuccess = (id: string) : any => {
  message.success('Programme successfully deleted');
  return {
    type: actionTypes.DELETE_PROGRAMME_SUCCESS,
    id
  };
};

export type DestroyProgrammeFailureAction = {
  type: string
};
export const deleteProgrammeFailure = (): DestroyProgrammeFailureAction => {
  message.error('Something went wrong, please try again later');
  return {
    type: actionTypes.DELETE_PROGRAMME_FAILURE
  };
};

export const deleteProgramme = (id: string) : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(deleteProgrammeIsLoading());
    return API.programmes
      .delete(id)
      .then(() => {
        dispatch(deleteProgrammeSuccess(id));
      })
      .catch(() => {
        dispatch(deleteProgrammeFailure());
      });
  };
}
