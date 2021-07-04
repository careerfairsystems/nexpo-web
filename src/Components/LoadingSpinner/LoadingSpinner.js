import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
const LoadingSpinner = () : React$Element<any> => (
  <div>
    <Spin tip="Loading..." indicator={antIcon} size="large" />
  </div>
);

export default LoadingSpinner;
