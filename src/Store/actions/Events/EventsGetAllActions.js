import type { Dispatch } from 'redux';
import { message } from 'antd';
import { actionTypes } from '../..';
import API from '../../../API';


export const getAllEventsIsLoading = () : any => ({
  type: actionTypes.FETCH_EVENTS,
});

export const getAllEventsSuccess = (events: Array<{}>) : any => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  events,
});

export const getAllEventsFailure = () : any => {
  message.error(
    'Something went wrong when trying to fetch all events, please try again later'
  );
  return {
    type: actionTypes.FETCH_EVENTS_FAILURE,
  };
};

export const getAllEvents = () : any => {
  return (dispatch: Dispatch<{ type: string }>) => {
    dispatch(getAllEventsIsLoading());
    return API.users
      .getAll()
      .then(users => {
        dispatch(getAllEventsSuccess(users.data));
      })
      .catch(() => {
        dispatch(getAllEventsFailure());
      });
  };
}
