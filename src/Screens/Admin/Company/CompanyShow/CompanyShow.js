import React, { useEffect } from 'react';
import {
  isEmpty,
  isNil,
  sortBy,
  groupBy,
  filter,
  last,
  map,
  toPairs,
  reduce,
  getOr,
  flatten,
  flow
} from 'lodash/fp';
import {
  List,
  Avatar,
  Button,
  Tag,
  Popconfirm,
  Select,
  Statistic,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import NotFound from '../../../NotFound';
import { toExternal } from '../../../../Util/URLHelper';
import { toDayFormat } from '../../../../Util/FormatHelper';
import InvisibleLink from '../../../../Components/InvisibleLink';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import './CompanyShow.scss';
import CompanyStudentSessionForm from '../../../../Forms/CompanyStudentSessionForm';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
type Props = {
  id: string,
  createStudentSession: ({}) => Promise<void>,
  deleteStudentSession: string => Promise<void>,
  company: {
    id?: string,
    name?: string,
    website?: string,
    description?: string,
    logoUrl?: string,

    studentSessionDays?: number,
    studentSessionApplications?: Array<*>,
    studentSessionTimeSlots?: Array<{
      id: number,
      start: string,
      end: string,
      location: string,
      studentSession: {
        student: {
          user: {
            firstName?: string,
            lastName?: string,
            email?: string,
            phoneNumber?: string
          }
        }
      }
    }>,
    topStudents?: Array<{ id: number, firstName: string, lastName: string }>
  },
  fetching: boolean,
  getCompany: string => Promise<void>,
  match?: {
    path: string
  }
};
const statusLabel = [
  { text: 'Unanswered', color: 'gold' },
  { text: 'Confirmed', color: 'green' },
  { text: 'Declined', color: 'red' }
];

const CompanyShow = ({
  id,
  createStudentSession,
  deleteStudentSession,
  company,
  fetching,
  getCompany,
  match
}: Props): React$Element<any> => {
  useEffect(() => {
    getCompany(id);
  }, [getCompany, id]);

  const handleSubmit = (values: { studentId: string }, id: number) => {
    createStudentSession({
      studentSession: {
        companyId: company.id,
        studentId: values.studentId,
        studentSessionTimeSlotId: id
      }
    });
  };

  const showStudentSession = () => {
    switch (company.studentSessionDays) {
      case 0:
        return 'No days';
      case 1:
        return 'First day';
      case 2:
        return 'Second day';
      case 3:
        return 'Both days';
      default:
        return 'Invalid days';
    }
  };

  if (fetching) return <LoadingSpinner />;
  if (isEmpty(company) || isNil(company)) return <NotFound />;

  const {
    name = '',
    website,
    logoUrl,
    description,
    topStudents = [],
    studentSessionTimeSlots = [],
    studentSessionApplications = []
  } = company;

  const studentSessionStatus = studentSession => {
    if (studentSession) {
      return statusLabel[studentSession.studentSessionStatus].text;
    }
    return 'Not assigned';
  };

  const studentSessionStatusColor = studentSession => {
    if (studentSession) {
      return statusLabel[studentSession.studentSessionStatus].color;
    }
    return 'blue';
  };

  const studentInfo = ({ student: { user } }) => (
    <section className="fields">
      <div className="field">
        <span>Name:</span>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
      <div className="field">
        <span>Email:</span>
        <span>{user.email}</span>
      </div>
      <div className="field">
        <span>Phone Number:</span>
        <span>{user.phoneNumber}</span>
      </div>
    </section>
  );

  const options = map(
    s => (
      <Select.Option key={s.id}>{`${s.firstName} ${s.lastName}`}</Select.Option>
    ),
    topStudents
  );

  // $FlowIgnore
  const data = flow(
    //sortBy(['location', 'start']),
    map(({ studentSession, ...rest }) => ({
      ...getOr({}, 'student.user', studentSession),
      ...rest
    })),
    reduce((acc, curr) => {
      const prev = last(acc) || {};
      const start = prev.end;
      const end = curr.start;

      const sameLocation = prev.location === curr.location;
      const sameDay = moment(start).isSame(end, 'day');

      if (start !== end && sameDay && sameLocation) {
        const breaktime = moment(end).diff(start, 'minutes');
        acc.push({
          start,
          end,
          location: curr.location,
          firstName: `Break (${breaktime} min)`
        });
      }

      return acc.concat([curr]);
    }),
    groupBy(
      ({ start, location }) => `${moment(start).format('dddd')} - ${location}`
    ),
    toPairs,
    map(([key, values]) => [
      ['', key],
      ...flatten(
        values.map(({ start, firstName, lastName, email, phoneNumber }) => [
          [moment(start).format('HH:mm'), [firstName, lastName].join(' ')],
          ['', email],
          ['', phoneNumber && `=""${phoneNumber}""`]
        ])
      ),
      [],
      []
    ]),
    flatten
  )(studentSessionTimeSlots);

  return (
    <div className="company-show-view">
      <HtmlTitle title={name} />
      <section className="company-show">
        <div className="avatar">
          <Avatar
            src={logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
          <h1>{name}</h1>
          <a href={toExternal(website)}>{website}</a>
        </div>
        <div className="information">
          <div className="description">
            <p>{description}</p>
          </div>
          <div className="student-sessions">
            <Statistic
              title={`${name} has student sessions:`}
              value={showStudentSession()}
            />
            <Statistic
              title="Student Session Application Scored"
              value={filter('score', studentSessionApplications).length}
            />
          </div>
          <div>
            <h3>Student Session Time Slots</h3>
            <CSVLink data={data} filename={`${name} - Student Sessions.csv`}>
              <Button icon={<DownloadOutlined />}>Download Schema</Button>
            </CSVLink>
          </div>
        </div>
      </section>
      <br />
      <br />
      <List
        itemLayout="vertical"
        // $FlowFixMe
        dataSource={sortBy(
          ['location', 'start'],
          company.studentSessionTimeSlots || []
        )}
        bordered
        renderItem={(
          { id: itemId, start, end, location, studentSession },
          index
        ) => (
          <List.Item
            actions={[
              <>
                {studentSession ? (
                  <div className="list-buttons">
                    <Popconfirm
                      title={`Sure to ${'remove'}?`}
                      onConfirm={() => {
                        deleteStudentSession(studentSession.id);
                      }}
                    >
                      <Button onClick={() => null} type="danger">
                        Remove
                      </Button>
                    </Popconfirm>
                  </div>
                ) : (
                  <div className="list-buttons">
                    <CompanyStudentSessionForm
                      options={options}
                      id={itemId}
                      onSubmit={values => handleSubmit(values, itemId)}
                      initialValues={{
                        studentId: options[0] ? options[0].key : null
                      }}
                    />
                  </div>
                )}
              </>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size="large">{index + 1}</Avatar>}
              title={`Location: ${location}`}
              description={`Start Time: ${toDayFormat(
                start
              )}\nEnd Time: ${toDayFormat(end)}`}
            />
            <div className="company-show-list">
              {studentSession && studentInfo(studentSession)}
              <div className="field">
                <span>Student:</span>
                <Tag
                  className="student-confirmation"
                  color={studentSessionStatusColor(studentSession)}
                >
                  {studentSessionStatus(studentSession)}
                </Tag>
              </div>
            </div>
          </List.Item>
        )}
      />
      <br />
      <InvisibleLink to={`/admin/companies/${company.id || ''}/edit`}>
        <Button onClick={() => null} type="primary">
          Edit
        </Button>
      </InvisibleLink>
    </div>
  );
};

CompanyShow.defaultProps = {
  match: {
    path: ''
  }
};

export default CompanyShow;
