import { connect } from 'react-redux';
import { Actions, Selectors } from '../../Store';
import SidebarDrawer from './SidebarDrawer';

const mapStateToProps = (state, { location, history }) => ({
  isLoggedIn: state.auth.isLoggedIn
  /*   currentUser: Selectors.users.getCurrentUser(state),
  pathname: location.pathname,
  redirect: history.push */
});

const mapDispatchToProps = {
  logout: Actions.auth.logout
};

const stateful = connect(mapStateToProps, mapDispatchToProps)(SidebarDrawer);

export default stateful;
