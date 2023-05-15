import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getJwtToken } from '@/utils/cache';

export default function Page() {
  return (
    <PageContainer>
      <Card>
        <Upload name='file' action={'http://localhost/api/storage/upload'} headers={{"Authorization" : getJwtToken() ?? ""}} >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Card>
    </PageContainer>
  );
}
