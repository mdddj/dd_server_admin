import React from 'react';
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button } from "antd";
import { ResourcesCategory } from "@/services/resource/types";
import { MyApiWithResourceCategoryUpdateAndSave } from "@/services/resource/apis";

export default function CreateOrUpdateCategory() {
  return (
    <ModalForm<ResourcesCategory> width={300} title={'新增一个分类'} trigger={<Button type={'primary'}>新增</Button>} onFinish={ async (params)=> {
      let result = await MyApiWithResourceCategoryUpdateAndSave(params)
      return result.success
    }} >
     <ProFormText name={'name'} label={"名称"} />
   </ModalForm>
  );
}
