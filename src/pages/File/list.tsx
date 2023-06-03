import React from 'react';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Space, message, Avatar } from "antd";
import { FileInfo } from '@/services/file/type';
import { DeleteFileById, GetAllFile } from '@/services/file/FileController';
import { HOST_NAME } from "@/constants";

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
            dataIndex: 'url',
            render: (dom, entity) => <Avatar src={HOST_NAME+entity.url} />
          },
          content:{
            dataIndex: "absolutePath"
          },
          actions: {
            render(dom, entity, index, action) {
              return <Space>
                <Popconfirm title={'确定删除吗？'} onConfirm={ async ()=>{
                  let hide = message.loading("正在删除")
                  await DeleteFileById(entity.id)
                  hide()
                  action?.reload()
                }} >
                  <a>删除</a>
                </Popconfirm>
              </Space>
            },
          }
        }} headerTitle="列表" toolBarRender={()=>{
          return [
            <Button type='primary' key={'upload'}>
              上传图片
            </Button>
          ]
        }} >
        
        </ProList>
      </Card>
    </PageContainer>
  );
}
