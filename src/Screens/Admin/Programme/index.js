import { connect } from 'react-redux';

import { Actions } from '../../../Store';
import Programme from './Programme';

const mapStateToProps = (state, props) => {
  const programmeId = props.match.params.id;
  const programme = state.entities.programmes[programmeId] || {};

  return { id: programmeId, programme };
};

const mapDispatchToProps = {
  getProgramme: Actions.programmes.getProgramme,
  createProgramme: Actions.programmes.createProgramme,
  updateProgramme: Actions.programmes.updateProgramme
};

const stateful : any = connect(mapStateToProps, mapDispatchToProps)(Programme);

export default stateful;
