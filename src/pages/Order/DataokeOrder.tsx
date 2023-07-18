import { UserOrder } from '@/models/order';
import { PageContainer, ProTable } from '@ant-design/pro-components';

export default function Page() {
  return (
    <PageContainer title={'用户订单'}>
      <ProTable<UserOrder, UserOrder>
        columns={[
          {
            key: 'id',
            dataIndex: 'id',
            title: 'id',
          },
          {
            key: 'zheCode',
            dataIndex: 'zheCode',
            title: '折ID',
          },
        ]}
        rowKey={'id'}
      />
    </PageContainer>
  );
}
