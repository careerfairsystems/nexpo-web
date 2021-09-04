import React, { useEffect} from 'react';
import { toLower } from 'lodash/fp';
import { Table, Divider, Popconfirm } from 'antd';

import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import FilterSearch, { FilterIcon } from '../../Components/FilterSearch';


type Props = {
  users?: {},
  fetching: boolean,
  getAllUsers: () => Promise<void>
};

const Events = ({ users, fetching, getAllUsers }: Props): React$Element<any> => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (fetching) {
    return <LoadingSpinner />;
  }

  const renderUsers = () => {
    const userColumns = [
      {
        title: 'Email',
        dataIndex: ['email'],
        key: 'email',
        filterDropdown: FilterSearch,
        filterIcon: FilterIcon,
        onFilter: (value, user) => toLower(user.email).includes(toLower(value)),
        render: (email, { id }) => (
          <InvisibleLink to={`/admin/users/${id}`}>{email}</InvisibleLink>
        )
      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName'
      },
      {
        title: 'Action',
        key: 'action',
        render: user => {
          return (
            <span>
              <InvisibleLink to={`/admin/users/${user.id}`}>Show</InvisibleLink>
              <Divider type="vertical" />
              <InvisibleLink to={`/admin/users/${user.id}/edit`}>
                Edit
              </InvisibleLink>
              <Divider type="vertical" />
            </span>
          );
        }
      }
    ];

  const tempUsers = users || {};
  return (
    <div>
      <HtmlTitle title="Events" />

      <h1>Welcome to Events</h1>

      <Table
        columns={userColumns}
        dataSource={Object.keys(tempUsers).map(i => ({
          ...tempUsers[i],
          key: i
        }))}
      />
    </div>
  );
  }
  return renderUsers();
}

export default Events;
