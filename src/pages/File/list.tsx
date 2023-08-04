import { DeleteFileById, GetAllFile } from '@/services/file/FileController';
import { FileInfo } from '@/services/file/type';
import { PageContainer, ProList } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Image,
  Popconfirm,
  Space,
  Typography,
  message,
} from 'antd';

export default function Page() {
  return (
    <PageContainer>
      <Card>
        <ProList<FileInfo>
          request={async (params) => {
            let result = await GetAllFile({ ...params, remove: 1 });
            return {
              success: true,
              data: result.data.list,
            };
          }}
          pagination={{}}
          rowKey={'id'}
          metas={{
            title: {
              dataIndex: 'fileName',
            },
            description: {
              dataIndex: 'url',
              render: (dom, entity) => (
                <Typography.Paragraph
                  copyable={{ text: entity.url }}
                  type={'secondary'}
                >
                  <span>直链:{dom}</span>
                </Typography.Paragraph>
              ),
            },
            avatar: {
              dataIndex: 'url',
              render: (_dom, entity) => (
                <Image src={entity.url} width={48} height={48} />
              ),
            },
            content: {
              dataIndex: 'absolutePath',
              render: (dom) => {
                return <span>磁盘路径:{dom}</span>;
              },
            },
            subTitle: {
              dataIndex: 'createDate',
              render: (dom) => {
                return <>上传时间:{dom}</>;
              },
            },
            actions: {
              render(_, entity, __, action) {
                return (
                  <Space>
                    <Popconfirm
                      title={'确定删除吗？'}
                      onConfirm={async () => {
                        let hide = message.loading('正在删除');
                        await DeleteFileById(entity.id);
                        hide();
                        action?.reload();
                      }}
                    >
                      <a>删除</a>
                    </Popconfirm>
                  </Space>
                );
              },
            },
          }}
          headerTitle="列表"
          toolBarRender={() => {
            return [
              <Button type="primary" key={'upload'}>
                上传图片
              </Button>,
            ];
          }}
        ></ProList>
      </Card>
    </PageContainer>
  );
}
