import { connect } from 'react-redux';
import { Actions } from '../../../../Store';
import RoleNew from './RoleNew';

const mapDispatchToProps = {
  createRole: Actions.roles.createRole,
  getAllUsers: Actions.users.getAllUsers
};

const stateful : any = connect(null, mapDispatchToProps)(RoleNew);

export default stateful;
