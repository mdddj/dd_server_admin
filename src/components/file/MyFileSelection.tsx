import { OpenModalSelection } from '@/components/file/FileSelectorComponent';
import { GetAllFile } from '@/services/file/FileController';
import { FileInfo } from '@/services/file/type';
import { UploadOutlined } from '@ant-design/icons';

import { HOST_NAME } from '@/constants';
import { getAuthorizationHeader } from '@/utils/auth';
import { Button, Col, Modal, ModalProps, Row, Upload } from 'antd';
import React, { useState } from 'react';
import { useMount } from 'react-use';

export type MyFileSelectionProp = {
  onFileSelect: (fileInfo: FileInfo) => void;
};
const FileInfoCardLayout: React.FC<{ file: FileInfo; onClick: () => void }> = ({
  file,
  onClick,
}) => {
  return (
    <Col span={6}>
      <div
        style={{
          aspectRatio: 1,
          height: '100%',
          width: '100%',
          border: '1px solid grey',
          padding: 6,
          borderRadius: 12,
        }}
        onClick={onClick}
      >
        <img
          src={file.url}
          width={'100%'}
          height={'100%'}
          style={{ objectFit: 'cover' }}
          alt={file.fileName}
        />
      </div>
    </Col>
  );
};

///文件列表
const MyFileSelection: React.FC<MyFileSelectionProp & ModalProps> = ({
  onFileSelect,
  ...props
}) => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const getFiles = async () => {
    let result = await GetAllFile({ current: 1, pageSize: 20, remove: 1 });
    setFiles(result.data.list);
  };
  useMount(async () => {
    await getFiles();
  });
  return (
    <Modal title={'选择文件'} {...props}>
      <div style={{ marginBottom: 12 }}>
        <Upload
          name="file"
          action={HOST_NAME + '/api/storage/upload'}
          headers={getAuthorizationHeader()}
          onChange={async (info) => {
            if (info.file.status === 'done') {
              await getFiles();
            }
          }}
        >
          <Button type={'primary'} icon={<UploadOutlined />}>
            新.
          </Button>
        </Upload>
      </div>
      <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
        {files.map((value) => {
          return (
            <FileInfoCardLayout
              file={value}
              key={value.id}
              onClick={() => onFileSelect(value)}
            />
          );
        })}
      </Row>
    </Modal>
  );
};

export function OpenFileSelectionModal(props: MyFileSelectionProp) {
  OpenModalSelection(<MyFileSelection {...props} />, props);
}

export { MyFileSelection };
