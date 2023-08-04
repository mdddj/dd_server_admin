import SimpleAndMarkdownEditor from '@/components/editor/SimpleAndMarkdownEditor';
import FileSelectWidget from '@/components/file/FileSelectComponent';
import { ResourceCategorySelectProForm } from '@/components/selects/ResourceCategorySelect';
import { MyResourceAddPostApi } from '@/services/resource/apis';
import { MyResources } from '@/types/resource';
import {
  PageContainer,
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

export default function Page() {
  const formRef = useRef<ProFormInstance<MyResources>>();
  /**
   * 添加动态
   * @param values
   */
  const submit = async (values: MyResources): Promise<boolean> => {
    console.log(values);
    let hide = message.loading('请稍等');
    let data = await MyResourceAddPostApi(values);
    hide();
    message.info(data.message);
    return data.success;
  };

  return (
    <PageContainer title={'添加动态'}>
      <ProForm<MyResources>
        onFinish={submit}
        initialValues={{
          clickCount: 0,
        }}
        formRef={formRef}
      >
        <ProFormText name={'id'} label={'主键'} hidden={true} />
        <ProForm.Group>
          <ResourceCategorySelectProForm name={'categoryId'} label={'分类'} />
          <ProFormText name={'title'} label={'标题'} width={'lg'} />
        </ProForm.Group>
        <ProFormText name={'description'} label={'描述'} />
        <SimpleAndMarkdownEditor name={'content'} label={'正文内容'} />
        <ProForm.Group>
          <ProFormDatePicker name={'createDate'} label={'发布时间'} />
          <ProFormDatePicker name={'updateDate'} label={'修改时间'} />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText name={'label'} label={'标签'} />
          <FileSelectWidget
            onFileSelect={(fileInfo) => {
              formRef.current?.setFieldValue('thumbnailImage', fileInfo.url);
            }}
          >
            <ProFormText name={'thumbnailImage'} label={'缩略图'} />
          </FileSelectWidget>
          <ProFormText name={'links'} label={'链接'} />
          <ProFormText name={'type'} label={'类型'} />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText name={'authority'} label={'权限'} />
          <ProFormText name={'clickCount'} label={'点击量'} />
          <ProFormText name={'mianji'} label={'面基专用'} />
          <ProFormText name={'browserUrl'} label={'url'} />
        </ProForm.Group>
        <ProFormUploadButton
          name="pictures"
          label="图片"
          max={9}
          fieldProps={{
            name: 'pictures',
            listType: 'picture-card',
            multiple: true,
          }}
        />
      </ProForm>
    </PageContainer>
  );
}