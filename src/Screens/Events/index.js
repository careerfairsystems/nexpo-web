import { connect } from 'react-redux';
import Events from './Events';
import { Actions } from '../../Store';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({
  users: state.entities.users,
  fetching: state.api.users.fetching
});

const mapDispatchToProps = {
  getAllUsers: Actions.users.getAllUsers,
};

const stateful : any = connect(mapStateToProps, mapDispatchToProps)(Events);

export default stateful;

/*
import Events from './Events';

export default Events;
*/
