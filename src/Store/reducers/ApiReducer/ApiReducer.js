/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { combineReducers } from 'redux';
import ApiReducerCategories from './ApiReducerCategories';
import ApiReducerCompanies from './ApiReducerCompanies';
import ApiReducerCurrentUser from './ApiReducerCurrentUser';
import ApiReducerCurrentCompany from './ApiReducerCurrentCompany';
import ApiReducerStudentSession from './ApiReducerStudentSession';
import ApiReducerMailtemplates from './ApiReducerMailtemplates';
import ApiReducerDeadlines from './ApiReducerDeadlines';
import ApiReducerRoles from './ApiReducerRoles';
import ApiReducerUsers from './ApiReducerUsers';
import ApiReducerProgrammes from './ApiReducerProgrammes';
import ApiReducerForgotPassword from './ApiReducerForgotPassword';
import ApiReducerLogin from './ApiReducerLogin';
import ApiReducerVerifyForgotPassword from './ApiReducerVerifyForgotPassword';
import ApiReducerReplacePassword from './ApiReducerReplacePassword';
import ApiReducerEvents from './ApiReducerEvents';

export type ApiStatus = {
  fetching: boolean,
  success: boolean
};

export type ApiState = {
  categories: ApiStatus,
  companies: ApiStatus,
  mailtemplates: ApiStatus,
  deadlines: ApiStatus,
  roles: ApiStatus,
  users: ApiStatus,
  programmes: ApiStatus,
  currentUser: ApiStatus,
  currentCompany: ApiStatus,
  studentSession: ApiStatus,
  forgotPassword: ApiStatus,
  login: ApiStatus,
  replacePassword: ApiStatus & {
    errors: {
      password?: string[],
      passwordConfirmation?: string[]
    }
  },
  verifyForgotPasswordKey: ApiStatus
};

export const initialStatus: ApiStatus = {
  fetching: false,
  errors: ({} : any),
  success: false
};

export const fetching = {
  fetching: true,
  errors: ({} : any),
  success: false
};

export const retrieving = {
  fetching: false,
  errors: ({} : any),
  success: true
};

export const failure = (error: ?{ [key: string]: string }) : any => ({
  fetching: false,
  errors: error || ['There was an error'],
  success: false
});

// $FlowFixMe
export const ApiReducer = combineReducers({
  categories: ApiReducerCategories,
  companies: ApiReducerCompanies,
  currentUser: ApiReducerCurrentUser,
  currentCompany: ApiReducerCurrentCompany,
  studentSession: ApiReducerStudentSession,
  deadlines: ApiReducerDeadlines,
  mailtemplates: ApiReducerMailtemplates,
  roles: ApiReducerRoles,
  users: ApiReducerUsers,
  programmes: ApiReducerProgrammes,
  forgotPassword: ApiReducerForgotPassword,
  login: ApiReducerLogin,
  verifyForgotPasswordKey: ApiReducerVerifyForgotPassword,
  replacePassword: ApiReducerReplacePassword,
  events: ApiReducerEvents,
});

export default ApiReducer;
