import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import BlogCategorySelect from '@/components/selects/BlogCategorySelect';
import TagSelect from '@/components/tag/BlogTagSelect';

export default function Page() {
  return (
    <PageContainer title="发布文章">
      <Card>
        <Form layout='vertical'>
          <Form.Item label={"标题"} name={"name"} required>
            <Input />
          </Form.Item>

          <Form.Item label={'分类'} name={'categoryId'} required style={{ display: 'inline-block', width: 'calc(30% - 8px)' }}>
            <BlogCategorySelect />
          </Form.Item >
          <Form.Item label={"正文"} name={"content"} required>
            <MDEditor>
            </MDEditor>
          </Form.Item>
          <Form.Item label={'别名'} name={'alias'}>
            <Input/>
          </Form.Item>
          <Form.Item label={'主图'} name={'thumbnail'}>
            <Input/>
          </Form.Item>
          <Form.Item label={"标签"}>
            <TagSelect/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' >发布博客</Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
}
