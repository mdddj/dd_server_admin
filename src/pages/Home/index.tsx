import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import React from "react";
import MinioInfoWidget from "@/pages/minio/MinioInfoWidget";

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
          <MinioInfoWidget/>
      </div>
    </PageContainer>
  );
};

export default HomePage;
