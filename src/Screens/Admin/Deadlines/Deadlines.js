import React, { useEffect } from 'react';
import { Table, Button, Popconfirm, Divider } from 'antd';
import { sortBy } from 'lodash/fp';
import moment from 'moment';
import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a list of deadlines
 */
type Props = {
  deadlines?: {},
  fetching: boolean,
  getAllDeadlines: () => Promise<void>,
  deleteDeadline: string => Promise<void>
};

const Deadlines = ({
  deadlines,
  fetching,
  getAllDeadlines,
  deleteDeadline
}: Props): React$Element<any> => {
  useEffect(() => {
    getAllDeadlines();
  }, [getAllDeadlines]);

  const deadlineColumns = () => [
    {
      title: 'Name',
      dataIndex: ['name'],
      key: 'name',
      render: (name: string, { id }: { id: string }) => (
        <InvisibleLink to={`/admin/deadlines/${id}`}>{name}</InvisibleLink>
      )
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      render: start => (
        <span style={{ marginBottom: 'auto' }}>
          {moment(start).format('dddd, MMMM Do YYYY, hh:mm a')}
        </span>
      )
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end',
      render: end => (
        <span style={{ marginBottom: 'auto' }}>
          {moment(end).format('dddd, MMMM Do YYYY, hh:mm a')}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (deadline: { id: string }) => {
        return (
          <span>
            <InvisibleLink to={`/admin/deadlines/${deadline.id}`}>
              Edit
            </InvisibleLink>
            <Divider type="vertical" />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteDeadline(deadline.id)}
            >
              <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>
                Delete
              </span>
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  const renderDeadlines = () => {
    const tempDeadlines = deadlines || {};
    return (
      <div>
        <HtmlTitle title="Deadlines" />

        <h1>Deadlines</h1>

        <Table
          columns={deadlineColumns()}
          dataSource={sortBy(
            'name',
            Object.keys(tempDeadlines).map(i => ({
              ...tempDeadlines[i],
              key: i
            }))
          )}
        />
        <InvisibleLink to="/admin/deadlines/new">
          <Button onClick={() => null} type="primary">
            New deadline
          </Button>
        </InvisibleLink>
      </div>
    );
  };

  if (fetching) {
    return <LoadingSpinner />;
  }
  return renderDeadlines();
};

Deadlines.defaultProps = {
  deadlines: undefined
};

export default Deadlines;
