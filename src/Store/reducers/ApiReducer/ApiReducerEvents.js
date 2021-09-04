import { initialStatus, fetching, retrieving, failure } from './ApiReducer';
import * as actionTypes from '../../ActionTypes';
import type { ApiStatus } from './ApiReducer';


export const ApiReducerEvents = (
    state: ApiStatus = initialStatus,
    act: { type: string }
  ) : any => {
    switch (act.type) {
      case actionTypes.FETCH_EVENTS: {
        const stateChange = fetching;
        return { ...state, ...stateChange };
      }

      case actionTypes.FETCH_EVENTS_SUCCESS: {
        const stateChange = retrieving;
        return { ...state, ...stateChange };
      }

      case actionTypes.FETCH_EVENTS_FAILURE: {
        const stateChange = failure();
        return { ...state, ...stateChange };
      }

      default: {
        return state;
      }
    }
  };

  export default ApiReducerEvents;
