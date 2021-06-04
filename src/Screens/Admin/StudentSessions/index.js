import { connect } from 'react-redux';
import StudentSessions from './StudentSessions';
import { Actions } from '../../../Store';

const mapDispatchToProps = {
  createBulkStudentSessions: Actions.studentSessions.createBulkStudentSessions
};

const stateful : any = connect(null, mapDispatchToProps)(StudentSessions);

export default stateful;
