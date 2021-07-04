import students from '.';
import type { State } from '../../reducers';

export const getCurrentSessionAppl = (state: State) : any => {
  const { studentSessionApplications } = students.getCurrentStudent(state);

  return studentSessionApplications;
};

export default { getCurrentSessionAppl };
