import { connect } from 'react-redux';
import Programmes from './Programmes';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  programmes: state.entities.programmes,
  fetching: state.api.programmes.fetching
});

const mapDispatchToProps = {
  deleteProgramme: Actions.programmes.deleteProgramme,
  getAllProgrammes: Actions.programmes.getAllProgrammes
};

const stateful : any = connect(mapStateToProps, mapDispatchToProps)(Programmes);

export default stateful;
