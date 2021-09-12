import { connect } from 'react-redux';
import Events from './Events';
import { Actions } from '../../Store';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({
  events: state.entities.events,
  fetching: state.api.events.fetching
});

const mapDispatchToProps = {
  getAllEvents: Actions.events.getAllEvents,
};

const stateful : any = connect(mapStateToProps, mapDispatchToProps)(Events);

export default stateful;  

/*
import Events from './Events';

export default Events;
*/
