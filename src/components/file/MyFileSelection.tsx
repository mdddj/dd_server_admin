import { OpenModalSelection } from '@/components/file/FileSelectorComponent';
import { GetAllFile } from '@/services/file/FileController';
import { FileInfo } from '@/services/file/type';
import { GetRequestData } from '@/types/result';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, ModalProps } from 'antd';

export type MyFileSelectionProp = {
  onFileSelect: (fileInfo: FileInfo) => void;
};

///文件列表
const MyFileSelection: React.FC<MyFileSelectionProp & ModalProps> = ({
  onFileSelect,
  ...props
}) => {
  return (
    <Modal title={'选择文件'} {...props}>
      <ProTable<FileInfo>
        columns={[
          {
            dataIndex: 'url',
            title: '链接',
          },
          {
            title: '操作',
            render: (_, entity) => {
              return (
                <Button
                  onClick={() => {
                    onFileSelect(entity);
                  }}
                >
                  选择文件
                </Button>
              );
            },
          },
        ]}
        search={false}
        key={'id'}
        request={async (params) => {
          let result = await GetAllFile({ ...params, remove: 1 });
          return GetRequestData(result);
        }}
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
};

export function OpenFileSelectionModal(props: MyFileSelectionProp) {
  OpenModalSelection(<MyFileSelection {...props} />, props);
}

export { MyFileSelection };
