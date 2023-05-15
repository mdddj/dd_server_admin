import React from 'react';
import styles from './list.less';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Card } from 'antd';
import { FileInfo } from '@/services/file/type';
import { GetAllFile } from '@/services/file/FileController';

export default function Page() {
  return (
    <PageContainer>
      <Card>
        <ProList<FileInfo>
        request={ async (params)=>{
          let result =  await GetAllFile({...params,remove: 1})
          return {
            success: true,
            data: result.data.list
          }
        }} pagination={{}} rowKey={'id'} metas={{
          title: {
            dataIndex: 'fileName',
          },
          description: {
            dataIndex: "url"
          },
          avatar: {
            dataIndex: 'url'
          }
        }} headerTitle="列表" toolBarRender={()=>{
          return [
            <Button type='primary'>
              上传图片
            </Button>
          ]
        }} >
          
        </ProList>
      </Card>
    </PageContainer>
  );
}
