import React, { useEffect } from 'react';
import { filter, sortBy } from 'lodash/fp';
import { List, Avatar, Button } from 'antd';
import { toExternal } from '../../../Util/URLHelper';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import InvisibleLink from '../../../Components/InvisibleLink';
import '../Session.scss';

type Company = {
  name: string,
  website: string,
  logoUrl: string,
  description: string
};

type Props = {
  fetching: boolean,
  companies: { [string]: Company },
  getAllCompanies: () => Promise<void>
};

const SessionCompanies = ({
  fetching,
  companies,
  getAllCompanies
}: Props): React$Element<any> => {
  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

  const renderCompany = ({ name, website, logoUrl, description }: Company) => (
    <List.Item
      extra={
        <Avatar
          src={logoUrl}
          size={128}
          shape="square"
          alt="Company Logotype"
        />
      }
      actions={[
        <Button type="dashed">
          <InvisibleLink to="/session/application">Apply now</InvisibleLink>
        </Button>
      ]}
    >
      <List.Item.Meta
        title={name}
        description={<a href={toExternal(website)}>{website}</a>}
      />
      {description}
    </List.Item>
  );

  if (fetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="session-companies">
      <HtmlTitle title="Student Session Companies" />
      <h1>Student Session Companies</h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={sortBy('name', filter('studentSessionDays', companies))}
        renderItem={renderCompany}
        locale={{ emptyText: 'No Companies' }}
      />
    </div>
  );
};

export default SessionCompanies;
