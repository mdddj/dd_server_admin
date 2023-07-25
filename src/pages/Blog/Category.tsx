import React from "react";
import {
  ModalForm,
  PageContainer,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
  ProTable
} from "@ant-design/pro-components";
import { Button, Card, Image, message, Space } from "antd";
import {
  MyBlogControllerWithFindBlogCategoryList,
  MyBlogControllerWithUpdateBlogCategory
} from "@/services/blog/BlogController";
import { BlogCategory } from "@/types/blog";


type CategoryFormProp = {
  initValue?: BlogCategory,
  onSuccess?: () => void
}


/**
 * 新增获取修改表单
 * @constructor
 */
const CategoryForm: React.FC<CategoryFormProp> = ({ initValue,onSuccess }) => {

  //提交或者修改
  const onFinish = async (value: BlogCategory) => {
    message.loading("正在请求");
    let result = await MyBlogControllerWithUpdateBlogCategory(value);
    if(result.success){
       onSuccess?.()
    }
    return result.success;
  };

  return <ModalForm
    modalProps={{
      destroyOnClose: true
    }}
    trigger={<Button size={initValue ? "small" : "middle"}>{initValue ? "修改" : "添加分类"}</Button>}
    title={ initValue ? "修改分类" : "添加分类"} initialValues={initValue} onFinish={onFinish}>

    <ProFormText name={"id"} label={"主键ID"} hidden={true} />
    <ProFormText name={"name"} label={"分类名"} rules={[
      {
        "message": "请输入分类名称",
        "required": true
      }
    ]} />

    <ProFormText name={"logo"} label={"分类图标"} />
    <ProFormTextArea name={"intro"} label={"介绍,简介"} />

    <ProFormDatePicker name={"createTime"} label={"创建时间"} />

  </ModalForm>;
};


//博客分类管理
export default function Page() {
  return (
    <PageContainer title={"博客分类管理"} extra={[
      <CategoryForm key={"add"} />
    ]}>

      <Card>
        <ProTable<BlogCategory> columns={[
          {
            "key": "id",
            "dataIndex": "id",
            "title": "Id"
          },
          {
            "key": "name",
            "dataIndex": "name",
            "title": "分类名",
            width: 150
          },
          {
            "key": "logo",
            "dataIndex": "logo",
            "title": "Logo",
            render: (_, entity) => {
              return <Image src={entity.logo} width={68} />;
            },
            width: 100
          },
          {
            "key": "intro",
            "dataIndex": "intro",
            "title": "介绍"
          },
          {
            "key": "createTime",
            "dataIndex": "createTime",
            "title": "创建时间"
          },
          {
            title: "操作",
            render: (_, entity,__,action) => {
              return <Space>
                <CategoryForm initValue={entity} onSuccess={() => action?.reload()} />
              </Space>;
            }
          }
        ]} request={async (page, params) => {
          let result = await MyBlogControllerWithFindBlogCategoryList({ ...page, ...params, remove: 1 });
          return {
            success: result.success,
            data: result.data.content,
            total: result.data.totalPages
          };
        }} rowKey={"id"} />
      </Card>
    </PageContainer>
  );
}
