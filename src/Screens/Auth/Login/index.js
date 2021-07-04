import { connect } from 'react-redux';
import Login from './Login';
import { Actions } from '../../../Store';

const mapStateToProps = state => ({
  error: state.auth.error,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = {
  login: Actions.auth.login
};

const stateful : any = connect(mapStateToProps, mapDispatchToProps)(Login);

export default stateful;
