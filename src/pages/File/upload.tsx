import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getJwtToken } from '@/utils/cache';
import { HOST_NAME } from "@/constants";

export default function Page() {
  return (
    <PageContainer>
      <Card>
        <Upload name='file' action={HOST_NAME + '/api/storage/upload'} headers={{"Authorization" : getJwtToken() ?? ""}} >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Card>
    </PageContainer>
  );
}
