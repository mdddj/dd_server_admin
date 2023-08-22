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
                <Space direction={'vertical'} size={'small'}>
                  <Typography.Paragraph
                    copyable={{ text: entity.url }}
                    type={'secondary'}
                  >
                    <span>直链:{dom}</span>
                  </Typography.Paragraph>
                  {entity.thumbnail && (
                    <Typography.Paragraph
                      copyable={{ text: entity.thumbnail }}
                      type={'secondary'}
                    >
                      <span>直链:{entity.thumbnail}</span>
                    </Typography.Paragraph>
                  )}
                </Space>
              ),
            },
            avatar: {
              dataIndex: 'url',
              render: (_dom, entity) => (
                <Space>
                  <Image src={entity.url} width={100} height={100} />
                  {entity.thumbnail && (
                    <Image src={entity.thumbnail} width={100} height={100} />
                  )}
                </Space>
              ),
            },
            content: {
              dataIndex: 'absolutePath',
              render: (dom, entity) => {
                return (
                  <div>
                    <div>磁盘路径:{dom}</div>
                    <div>缩略图:{entity.thumbnailPath}</div>
                  </div>
                );
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
