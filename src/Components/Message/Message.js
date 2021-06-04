import React from 'react';

import { ExclamationCircleFilled, CheckCircleFilled } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import './Message.css';

/**
 * A Component which renders a message
 * - Consists of an icon, text, and a link
 */
const iconStyle = {
  width: 'auto',
  fontSize: 200
};
const styles = {
  error: {
    ...iconStyle,
    color: '#f44336'
  },
  success: {
    ...iconStyle,
    color: '#4caf50'
  }
};
type Props = {
  type: 'error' | 'success',
  message: string,
  linkUrl?: ?string,
  linkText?: ?string
};

const Message = ({ 
  message,
  linkUrl,
  linkText,
  type 
}: Props) : React$Element<any> => {
  let icon = null;
  switch (type) {
    case 'error':
      icon = (
        <ExclamationCircleFilled style={styles.error} />
      );
      break;
    case 'success':
      icon = <CheckCircleFilled style={styles.success} />;
      break;
    default:
      icon = '';
  }

  return (
    <div className="message-component">
      {icon}
      <div className="message">
        <div>{message}</div>
        {linkUrl ? <Link to={linkUrl}>{linkText}</Link> : null}
      </div>
    </div>
  );
};

Message.defaultProps = {
  linkUrl: null,
  linkText: ''
};

export default Message;
