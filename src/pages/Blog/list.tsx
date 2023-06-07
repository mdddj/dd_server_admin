import React from 'react';
import { PageContainer, ProList } from "@ant-design/pro-components";
import { Avatar, Button, Card, Space, Tag } from "antd";
import { Blog } from "@/types/blog";
import { GetBlogList } from "@/services/blog/BlogController";
import { useNavigate } from "@@/exports";
import { FileSelectorComponent } from "@/components/file/FileSelectorComponent";

const Page:React.FC = () => {

  const nav = useNavigate()


  return  <PageContainer>
    <Card>
      <ProList<Blog> pagination={{}} request={async params => {
        let data = await GetBlogList({ ...params })
        return {
          data: data.data.list,
          total: data.data.page.total,
          success: data.success
        }
      }} metas={{
        avatar: {
          render: (dom, entity) => {
            return <Avatar>{entity.id}</Avatar>
          }
        },
        title: {
          dataIndex: 'title'
        },
        subTitle: {
          render: (dom, entity) => {
            return <Space>
              {
                entity.tags.map(value => <Tag key={value.id}>{value.name}</Tag>)
              }
            </Space>
          }
        },
        description: {
          render: (dom, entity) => {
            return <Space>
              <a>{entity.author}</a>
              <span>发布于</span>
              <a>{entity.createTime}</a>
            </Space>
          }
        },
        actions: {
          render: (dom, entity) => {
            return <Space>
              <Button onClick={() => {
                nav('/blog/add?update='+entity.id)
              }}>编辑</Button>
              <Button type={'ghost'}>删除</Button>
            </Space>
          }
        }
      }} />
    </Card>
  </PageContainer>
};
export default Page
