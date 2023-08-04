import {
  MyResourceAddDeleteApi,
  MyResourceListApi,
} from '@/services/resource/apis';
import { MyResources } from '@/types/resource';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, message } from 'antd';

export default function Page() {
  return (
    <PageContainer title={'动态列表'}>
      <ProTable<MyResources>
        columns={[
          {
            key: 'id',
            dataIndex: 'id',
            title: '主键',
          },
          {
            key: 'user',
            dataIndex: 'user',
            title: '发布人',
          },
          {
            key: 'category',
            dataIndex: 'category',
            title: '分类',
          },
          {
            key: 'title',
            dataIndex: 'title',
            title: '标题',
          },
          {
            key: 'content',
            dataIndex: 'content',
            title: '正文内容',
          },
          {
            key: 'createDate',
            dataIndex: 'createDate',
            title: '发布时间',
          },
          {
            key: 'updateDate',
            dataIndex: 'updateDate',
            title: '修改时间',
          },
          {
            key: 'label',
            dataIndex: 'label',
            title: '标签',
          },
          {
            key: 'thumbnailImage',
            dataIndex: 'thumbnailImage',
            title: '缩略图',
          },
          {
            key: 'description',
            dataIndex: 'description',
            title: '描述',
          },
          {
            key: 'links',
            dataIndex: 'links',
            title: '链接',
          },
          {
            key: 'type',
            dataIndex: 'type',
            title: '类型',
          },
          {
            key: 'authority',
            dataIndex: 'authority',
            title: '权限',
          },
          {
            key: 'clickCount',
            dataIndex: 'clickCount',
            title: '点击量',
          },
          {
            key: 'fileInfo',
            dataIndex: 'fileInfo',
            title: '文件专用',
          },
          {
            key: 'images',
            dataIndex: 'images',
            title: '图片列表',
          },
          {
            key: 'mianji',
            dataIndex: 'mianji',
            title: '面基专用',
          },
          {
            key: 'browserUrl',
            dataIndex: 'browserUrl',
            title: 'url',
          },
          {
            title: '操作',
            render: (dom, entity, _, action) => {
              return (
                <Space>
                  <Popconfirm
                    title={'确定删除吗?'}
                    onConfirm={async () => {
                      let hide = message.loading('删除中');
                      let r = await MyResourceAddDeleteApi(entity.id!!);
                      if (r.success) {
                        action?.reload();
                      }
                      hide();
                    }}
                  >
                    <Button size={'small'} danger={true}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
        request={async (pager, params) => {
          let result = await MyResourceListApi({
            ...pager,
            ...params,
            remove: 1,
          });
          return {
            success: result.success,
            data: result.data.content,
            total: result.data.totalElements,
          };
        }}
      ></ProTable>
    </PageContainer>
  );
}
