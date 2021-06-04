import students from '.';
import type { State } from '../../reducers';

export const getCurrentSessions = (state: State) : any => {
  const { studentSessions } = students.getCurrentStudent(state);

  return studentSessions;
};

export default { getCurrentSessions };
