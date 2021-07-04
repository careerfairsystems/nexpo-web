import users from '../Users';
import type { State } from '../../reducers';

export const getCurrentStudent = (state: State) : any => {
  const { student } = users.getCurrentUser(state);
  return student;
};

export default { getCurrentStudent };
