import { connect } from 'react-redux';
import { Actions } from '../../../../Store';
import CompanyNew from './CompanyNew';

const mapDispatchToProps = {
  createCompany: Actions.companies.createCompany
};

const stateful : any = connect(null, mapDispatchToProps)(CompanyNew);

export default stateful;
