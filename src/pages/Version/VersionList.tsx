import { Version } from '@/services/version/VersionDataType';
import {
  MyVersionDeleteApi,
  MyVersionListApi,
} from '@/services/version/VersionService';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Checkbox, Popconfirm, Space, message } from 'antd';

export default function Page() {
  return (
    <PageContainer>
      <ProTable<Version>
        request={async (params) => {
          let result = await MyVersionListApi({ ...params, remove: 1 });
          return {
            data: result.data.content,
            total: result.data.totalElements,
            success: result.success,
          };
        }}
        columns={[
          {
            key: 'id',
            dataIndex: 'id',
            title: '主键',
          },
          {
            key: 'title',
            dataIndex: 'title',
            title: '标题',
          },
          {
            key: 'description',
            dataIndex: 'description',
            title: '更新记录',
          },
          {
            key: 'downloadUrl',
            dataIndex: 'downloadUrl',
            title: '下载地址(直链)',
          },
          {
            key: 'platform',
            dataIndex: 'platform',
            title: '平台',
          },
          {
            key: 'createDate',
            dataIndex: 'createDate',
            title: '创建时间',
          },
          {
            key: 'htmlViewPage',
            dataIndex: 'htmlViewPage',
            title: '第三方下载地址',
          },
          {
            key: 'packageSize',
            dataIndex: 'packageSize',
            title: '包大小',
          },
          {
            key: 'enable',
            dataIndex: 'enable',
            title: '是否有效',
            render: (dom, entity) => <Checkbox checked={entity.enable} />,
          },
          {
            key: 'versionNumber',
            dataIndex: 'versionNumber',
            title: '版本号',
          },
          {
            title: '操作',
            render: (_, entity, __, action) => {
              return (
                <Space>
                  <Popconfirm
                    title={'确定删除吗?'}
                    onConfirm={async () => {
                      if (entity.id) {
                        let hide = message.loading('删除中');
                        await MyVersionDeleteApi(entity.id);
                        action?.reload();
                        hide();
                      }
                    }}
                  >
                    <Button size={'small'} type={'link'}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
        rowKey={'id'}
      ></ProTable>
    </PageContainer>
  );
}
