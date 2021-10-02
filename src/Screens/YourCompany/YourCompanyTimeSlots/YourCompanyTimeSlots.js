import React, { useEffect } from 'react';
import { isEmpty, isNil, sortBy } from 'lodash/fp';
import { Avatar, List, Tag } from 'antd';
import { toDayFormat } from '../../../Util/FormatHelper';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import '../YourCompany.css';
import './YourCompanyTimeSlots.scss';

const statusLabel = [
  { text: 'Unanswered', color: 'gold' },
  { text: 'Confirmed', color: 'green' },
  { text: 'Declined', color: 'red' }
];

type Props = {
  currentCompany: {
    studentSessionDays?: number,
    studentSessionTimeSlots?: {
      start: string,
      end: string,
      location: string
    },
    name?: string,
    description?: string,
    website?: string,
    logoUrl?: string
  },
  getCurrentCompany: () => Promise<void>
};

const YourCompanyTimeSlots = ({
  currentCompany,
  getCurrentCompany
}: Props): React$Element<any> => {
  useEffect(() => {
    getCurrentCompany();
  }, [getCurrentCompany]);

  if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />;

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

  return (
    <div className="company-show-view">
      <HtmlTitle title="TimeSlots" />
      <h3>Student Session Time Slots</h3>
      <List
        itemLayout="vertical"
        dataSource={sortBy(
          'start',
          currentCompany.studentSessionTimeSlots || []
        )}
        bordered
        renderItem={({ start, end, location, studentSession }, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size="large">{index + 1}</Avatar>}
              title={`Location: ${location}`}
              description={`Start Time: ${toDayFormat(
                start
              )}\nEnd Time: ${toDayFormat(end)}`}
            />
            <div className="CompanyTimeSlots">
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
    </div>
  );
};

export default YourCompanyTimeSlots;
