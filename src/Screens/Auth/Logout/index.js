import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Logout from './Logout';
import { Actions } from '../../../Store';

const stateful : any = connect(null, (dispatch: Dispatch<any>) => ({
  logout: () => dispatch(Actions.auth.logout())
}))(Logout);

export default stateful;
