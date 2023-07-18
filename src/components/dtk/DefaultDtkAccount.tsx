import { MyDtkServiceFindDefaultApi } from '@/services/dtk/DtkService';
import { useRequest } from '@umijs/max';
import { Spin, Tag } from 'antd';

const DefaultDtkAccountWidegt: React.FC = () => {
  const { loading, data, error } = useRequest(() =>
    MyDtkServiceFindDefaultApi(),
  );
  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <span>{error.message}</span>;
  }
  if (!data) {
    return <span>未设置大淘客账号</span>;
  }
  return <Tag>已设置默认大淘客账号: {data.title}</Tag>;
};

export default DefaultDtkAccountWidegt;
