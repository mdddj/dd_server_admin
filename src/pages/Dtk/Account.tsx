import DefaultDtkAccountWidegt from '@/components/dtk/DefaultDtkAccount';
import DesensitizationTextWidget from '@/components/widget/DesensitizationText';
import { DTKDetail } from '@/models/tdk';
import {
  MyDtkServiceAddApi,
  MyDtkServiceChangeDefaultAccountApi,
  MyDtkServiceGetAllApi,
} from '@/services/dtk/DtkService';
import {
  ModalForm,
  PageContainer,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Checkbox, Image, Typography, message } from 'antd';
import React, { useRef } from 'react';

type DtkDetailFormProp = {
  updateModel?: DTKDetail;
};

///添加或者删除表单
const DtkDetailForm: React.FC<DtkDetailFormProp> = ({ updateModel }) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm<DTKDetail>
      title={updateModel ? '修改信息' : '添加大淘客账号'}
      trigger={
        <Button
          type={updateModel ? 'default' : 'primary'}
          size={updateModel ? 'small' : 'middle'}
        >
          {updateModel ? '修改' : '添加'}
        </Button>
      }
      onFinish={async (values: DTKDetail) => {
        let hide = message.loading(
          updateModel ? '正在修改账号信息' : '正在添加账号',
        );
        let result = await MyDtkServiceAddApi(values);
        if (result.success) {
          formRef.current?.resetFields();
        }
        hide();
      }}
      formRef={formRef}
      initialValues={updateModel}
    >
      <ProFormText
        name={'appKey'}
        label={'appKey'}
        rules={[
          {
            required: true,
            message: '请输入appKey',
          },
        ]}
      />

      <ProFormText
        name={'appSecret'}
        label={'appSecret'}
        rules={[
          {
            required: true,
            message: '请输入appSecret',
          },
        ]}
      />

      <ProFormText name={'title'} label={'标题'} />
      <ProFormTextArea name={'intro'} label={'介绍'} />
      <ProFormText name={'logo'} label={'图标'} />
      <ProFormCheckbox name={'selectDefault'}>
        设置为默认应用 <DefaultDtkAccountWidegt />
      </ProFormCheckbox>
    </ModalForm>
  );
};

export default function Page() {
  return (
    <PageContainer title={'大淘客账号管理'}>
      <Card>
        <DtkDetailForm />
        <ProTable<DTKDetail>
          rowKey={'id'}
          columns={[
            {
              key: 'id',
              dataIndex: 'id',
              title: 'Id',
            },
            {
              key: 'appKey',
              dataIndex: 'appKey',
              title: 'appKey',
              render: (_, e) => {
                return (
                  <Typography.Paragraph copyable={{ text: e.appKey }}>
                    <DesensitizationTextWidget text={e.appKey} />
                  </Typography.Paragraph>
                );
              },
            },
            {
              key: 'appSecret',
              dataIndex: 'appSecret',
              title: 'appSecret',
              render: (_, e) => {
                return (
                  <Typography.Paragraph copyable={{ text: e.appSecret }}>
                    <DesensitizationTextWidget text={e.appSecret} />
                  </Typography.Paragraph>
                );
              },
            },
            {
              key: 'title',
              dataIndex: 'title',
              title: '名称',
            },
            {
              key: 'intro',
              dataIndex: 'intro',
              title: '介绍',
            },
            {
              key: 'selectDefault',
              dataIndex: 'selectDefault',
              title: '是否启用',
              search: false,
              render: (_, m, __, action) => (
                <Checkbox
                  checked={m.selectDefault}
                  onChange={async (e) => {
                    let c = e.target.checked;
                    let hide = message.loading('正在设置');
                    await MyDtkServiceChangeDefaultAccountApi({
                      action: c,
                      id: m.id!!,
                    });
                    hide();
                    action?.reload();
                  }}
                >
                  默认应用
                </Checkbox>
              ),
            },
            {
              key: 'logo',
              dataIndex: 'logo',
              title: '图标',
              search: false,
              render: (_, m) => <Image src={m.logo} width={32} />,
            },
            {
              title: '操作',
              render: (_, m) => <DtkDetailForm updateModel={m} />,
            },
          ]}
          request={async (params, _, filter) => {
            let result = await MyDtkServiceGetAllApi({
              ...params,
              ...filter,
              remove: 1,
            });
            return {
              success: result.success,
              data: result.data.content,
              total: result.data.totalElements,
            };
          }}
        />
      </Card>
    </PageContainer>
  );
}
