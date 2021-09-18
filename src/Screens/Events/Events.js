import React, { useEffect } from 'react';
import { Table } from 'antd';

import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import DateFilter from '../../Components/DateFilter';

type Props = {
  events?: {},
  fetching: boolean,
  getAllEvents: () => Promise<void>
};

const Events = ({ events, fetching, getAllEvents }: Props): React$Element<any> => {
  useEffect(() => {
      //API.events.getAll();
      getAllEvents();
  }, [getAllEvents]);

  if (fetching) {
    return <LoadingSpinner />;
  }

  const renderEvents = () => {
    const eventColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }
      ,
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Start',
        dataIndex: 'start',
        key: 'start'
      },
      {
        title: 'End',
        dataIndex: 'end',
        key: 'end'
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location'
      },
    ];

  const deadline = {};
  const handleDeadline = () => {};
  const tempEvents = events || {};
  return (
    <div>
      <HtmlTitle title='Events' />

      <h1>Welcome to Events</h1>
      <DateFilter/>

      <Table
        columns={eventColumns}
        dataSource={Object.keys(tempEvents).map(i => ({
          ...tempEvents[i],
          key: i
        }))}
      />
    </div>
  );
  }
  return renderEvents();
}

Events.defaultProps = {
  events: undefined
};

export default Events;
