import MinioUpdateComponent from '@/pages/minio/UpdateConfig';
import { getMinioConfig } from '@/services/minio/MinioService';
import { useRequest } from '@umijs/max';
import { Descriptions } from 'antd';
import React from 'react';
import { useMount } from 'react-use';

const MinioInfoWidget: React.FC = () => {
  const { data, run, refresh } = useRequest(getMinioConfig, {
    manual: true,
  });

  useMount(() => {
    run();
  });

  return (
    <>
      <div>
        <Descriptions
          title={'minio配置'}
          extra={<MinioUpdateComponent onUpdated={refresh} />}
        >
          <Descriptions.Item label={'host'}>{data?.endpoint}</Descriptions.Item>
          <Descriptions.Item label={'accessKey'}>
            {data?.accessKey}
          </Descriptions.Item>
          <Descriptions.Item label={'secretKey'}>
            {data?.secretKey}
          </Descriptions.Item>
          <Descriptions.Item label={'bucket'}>
            {data?.bucketName}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};
export default MinioInfoWidget;
