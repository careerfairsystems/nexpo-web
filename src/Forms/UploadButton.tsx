import React from 'react';
import { isEmpty } from 'lodash/fp';
import { message, Button, Icon, Upload } from 'antd';
import makeField from './helper';

type Props = {
  accept: string;
  value: Record<string, unknown> | string;
  onChange: (file?: File) => Promise<void>;
};

const UploadButton = ({ accept = '', value, onChange }: Props) => (
  <Upload
    key="uploadButton"
    accept={accept}
    fileList={isEmpty(value) ? [] : [value]}
    beforeUpload={(file) => {
      if (file.size < 1e6) onChange(file);
      else message.warning('Cannot upload files larger than 1MB');
      return false;
    }}
    onRemove={() => onChange(null)}
  >
    <Button>
      <Icon type="upload" />
      Upload
    </Button>
  </Upload>
);

// UploadButton.defaultProps = {
//   accept: ''
// };

export default makeField(UploadButton);
