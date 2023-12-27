import FileSelectWidget from '@/components/file/FileSelectComponent';
import { MyVersionSaveApi } from '@/services/version/VersionService';
import {
  PageContainer,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Card } from 'antd';
import { useRef } from 'react';

export default function AddNewVersionForm() {
  const formKey = useRef<ProFormInstance>();
  ///提交数据
  const onFinish = async (values: any) => {
    const result = await MyVersionSaveApi(values);
    return result.success;
  };
  return (
    <PageContainer title={'发布新版本'}>
      <Card>
        <ProForm onFinish={onFinish} formRef={formKey}>
          <ProFormText name={'id'} label={'主键'} hidden={true} />

          <ProFormText name={'title'} label={'标题'} />

          <ProFormTextArea name={'description'} label={'更新记录'} />

          <FileSelectWidget
            onFileSelect={(fileInfo) => {
              formKey.current?.setFieldValue('downloadUrl', fileInfo.url);
              formKey.current?.setFieldValue('packageSize', fileInfo.fileSize);
            }}
          >
            <ProFormTextArea
              fieldProps={{ rows: 5 }}
              name={'downloadUrl'}
              label={'下载地址(直链)'}
            />
          </FileSelectWidget>

          <ProFormSelect
            name={'platform'}
            label={'平台'}
            options={[
              {
                label: '苹果',
                value: 'Ios',
              },
              {
                label: '安卓',
                value: 'Android',
              },
              {
                label: 'Windows',
                value: 'Windows',
              },
              {
                label: 'Macos',
                value: 'Macos',
              },
              {
                label: 'Linux',
                value: 'Linux',
              },
            ]}
          />

          <ProFormDatePicker name={'createDate'} label={'创建时间'} />

          <ProFormText name={'htmlViewPage'} label={'第三方下载地址'} />

          <ProFormText name={'packageSize'} label={'包大小'} />

          <ProFormCheckbox name={'enable'} label={'是否有效'} />
          <ProFormCheckbox
            name={'disabled'}
            label={'是否有效'}
            hidden={true}
            initialValue={false}
          />

          <ProFormText
            name={'versionNumber'}
            label={'版本号'}
            rules={[
              {
                required: true,
                message: '请输入版本号',
              },
            ]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
}
