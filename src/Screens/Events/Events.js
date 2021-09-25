import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import DateFilter from '../../Components/DateFilter';
import API from '../../API'

type Props = {
  events?: {},
  fetching: boolean,
  getAllEvents: () => Promise<void>
};


const Events = ({ events, fetching, getAllEvents }: Props): React$Element<any> => {
  const [date, setDate] = useState(null);
  const [table, setTable] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const getEvents = async () => {
      /*       Redux
            //API.events.getAll();
            await getAllEvents(); */
      API.events.getAll().then(events => {
        setData(events.data)
        setTable(events.data)
        console.log(events.data)
      });
    }
    getEvents()
  }, [/* getAllEvents */]);

  if (fetching) {
    return <LoadingSpinner />;
  }

  const renderEvents = () => {
    const eventColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      }
      ,
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => a.date.localeCompare(b.date),

      },
      {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        sorter: (a, b) => a.start.localeCompare(b.start),

      },
      {
        title: 'End',
        dataIndex: 'end',
        key: 'end',
        sorter: (a, b) => a.end.localeCompare(b.end),
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        sorter: (a, b) => a.location.localeCompare(b.location),
      },
    ];

    const deadline = {};
    const handleDeadline = () => { };
    const tempEvents = events || {};

    const handleDate = (e) => {
      setDate(e);
      console.log(moment(date).format('YYYY-MM-DD'));
    }

    const handleFilter = (e) => {
      const filterTable = e ? data.filter((item) =>
        moment(item.date)
          .format('YYYY-MM-DD')
          .includes(moment(e).format('YYYY-MM-DD'))
      ) : data;
      setTable(filterTable);
    };

    return (
      <div>
        <HtmlTitle title='Events' />

        <h1>Welcome to Events</h1>
        <DateFilter onChange={handleFilter} />

        <Table
          columns={eventColumns}
          /*           dataSource={Object.keys(tempEvents).map(i => ({
                      ...tempEvents[i],
                      key: i
                    }))} */
          dataSource={table}
          pagination={{ pageSize: 2, position: ['bottomCenter'] }}
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
