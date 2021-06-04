import React from 'react';
import { connect } from 'react-redux';
import { filter, isEmpty } from 'lodash/fp';
import { Table } from 'antd';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import type { State } from '../../../Store/reducers';

/**
 * Responsible for rendering a table of attributes and entries
 */
type Props = {
  fetching: boolean,
  attributes?: Array<any>,
  entries?: Array<any>
};
export const Attributes = ({ fetching, attributes, entries }: Props) : React$Element<any> => (
  <div>
    {fetching && <LoadingSpinner />}
    {!fetching && <Table columns={attributes} dataSource={entries} />}
  </div>
);

Attributes.defaultProps = {
  attributes: undefined,
  entries: undefined
};

const stateful : any = connect((state: State, props) => {
  if (
    isEmpty(state.entities.attributes) ||
    isEmpty(state.entities.entries) ||
    isEmpty(state.entities.companies)
  )
    return { fetching: true };

  const attributeIds = props.ids;

  const attributes = filter(
    // $FlowIgnore
    ({ id }) => attributeIds.includes(id),
    state.entities.attributes
  );

  const entries = filter(
    // $FlowIgnore
    ({ attribute }) => attributeIds.includes(attribute),
    state.entities.entries
  )
    .map(entry => ({
      ...entry,
      // $FlowIgnore
      company: state.entities.companies[entry.company],
      // $FlowIgnore
      attribute: state.entities.attributes[entry.attribute]
    }))
    .map(entry => ({
      ...entry,
      // $FlowIgnore
      key: entry.id,
      companyName: entry.company.name,
      // $FlowIgnore
      [entry.attribute.title.toLowerCase()]: entry.value
    }));

  const companyColumn = {
    title: 'Company',
    dataIndex: 'companyName',
    key: 'company',
    fixed: 'left'
  };

  return {
    fetching: state.api.categories.fetching,
    attributes: [companyColumn].concat(
      // $FlowIgnore
      attributes.map(({ title }) => ({
        title,
        dataIndex: title.toLowerCase(),
        key: title.toLowerCase()
      }))
    ),
    entries
  };
})(Attributes);

export default stateful;