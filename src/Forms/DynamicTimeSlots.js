import React from 'react';
import { zipWith, sortBy, flow } from 'lodash/fp';
import { Table, Input, Checkbox, Button } from 'antd';
import { Field } from 'redux-form';
import moment from 'moment';
import type { FieldProps } from 'redux-form/es/FieldProps.types.js.flow';
import makeField, { required } from './helper';
import DatePicker from '../Components/DatePicker';
import TimePicker from '../Components/TimePicker';

const TextInput = makeField(Input);
const FieldCheckbox = makeField(Checkbox);
const MyDatePicker = makeField(DatePicker);
const MyTimePicker = makeField(TimePicker);

type Props = FieldProps & {
  fields: Array<Array<any>> & Array<{}>,
  fieldValues: {
    date: any,
    startTime: any,
    endTime: any,
    timeslotLength: any,
    breakLength: any,
    location: any
  }
};

const generateTimeSlots = (fields, values) => {
  const {
    date,
    startTime,
    endTime,
    timeslotLength,
    breakLength,
    location
  } = values;
  if (!date || !startTime || !endTime) return;

  const current = moment.utc(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm');
  const end = moment.utc(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm');
  const sessionLength = timeslotLength + breakLength;

  while (current.isBefore(end)) {
    fields.push({
      key: current.toISOString(),
      start: moment.utc(current),
      end: moment.utc(current).add(sessionLength, 'minutes'),
      location
    });
    current.add(sessionLength, 'minutes');
  }
};

const columns = [
  {
    title: 'Start Time',
    key: 'start',
    dataIndex: ['field'],
    render: timeSlot => (
      <Field
        name={`${timeSlot}.start`}
        type="text"
        showTime
        props={{ format: 'YYYY-MM-DD HH:mm' }}
        component={MyDatePicker}
        validate={required}
        required
      />
    )
  },
  {
    title: 'End Time',
    key: 'end',
    dataIndex: 'field',
    render: timeSlot => (
      <Field
        name={`${timeSlot}.end`}
        type="text"
        showTime
        props={{ format: 'YYYY-MM-DD HH:mm' }}
        component={MyDatePicker}
        validate={required}
        required
      />
    )
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'field',
    render: timeSlot => (
      <Field
        name={`${timeSlot}.location`}
        type="text"
        placeholder="Enter location..."
        component={TextInput}
        validate={required}
        required
      />
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: ({ id, field, fields }, timeSlot, index) => (
      <>
        {id && (
          <Field
            name={`${field}.delete`}
            type="checkbox"
            component={FieldCheckbox}
          >
            Mark for Delete
          </Field>
        )}
        {!id && (
          <Button type="primary" danger onClick={() => fields.remove(index)}>
            Delete
          </Button>
        )}
      </>
    )
  }
];

const DynamicTimeSlots = ({
  fields,
  fieldValues
}: Props): React$Element<any> => (
  <div className="student-session-time-slots">
    <div className="add">
      <div>
        <Field name="date" label="Date" component={MyDatePicker} />
        <Field name="startTime" label="Start Time" component={MyTimePicker} />
        <Field name="endTime" label="End Time" component={MyTimePicker} />
        <Field
          name="location"
          type="text"
          placeholder="Enter location..."
          component={TextInput}
          label="Location"
        />
      </div>
      <div className="time-length">
        <Field
          name="timeslotLength"
          type="number"
          defaultValue={20}
          component={TextInput}
          label="Timeslot length"
          addonAfter="minutes"
        />
        <Field
          name="breakLength"
          type="number"
          component={TextInput}
          label="Break length"
          addonAfter="minutes"
        />
        <Button
          style={{ marginBottom: '1px' }}
          type="secondary"
          onClick={() => generateTimeSlots(fields, fieldValues)}
        >
          Generate Time Slots
        </Button>
      </div>
    </div>
    <section className="table">
      <Table
        size="large"
        dataSource={flow(
          zipWith(
            (field, obj: {| id: number |}) => ({
              field,
              key: obj.id,
              ...obj,
              fields
            }),
            fields.map(i => i)
          ),
          sortBy('start')
          // fields.getAll()
          // $FlowIgnore
        )(fields.getAll())}
        Props
        columns={columns}
        locale={{ emptyText: 'No Student Time Slots' }}
      />
      <div className="button">
        <Button
          type="primary"
          onClick={() => fields.push({ key: fields.length })}
        >
          Add a time slot
        </Button>
      </div>
    </section>
  </div>
);

export default DynamicTimeSlots;
