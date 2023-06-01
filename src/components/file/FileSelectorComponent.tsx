import { ProList } from "@ant-design/pro-components";
import { FileInfo } from "@/services/file/type";
import { GetAllFile } from "@/services/file/FileController";
import React from "react";
import { Button, Modal } from "antd";

/**
 * 文件选择列表
 * @constructor
 */
const FileSelectorComponent:React.FC = () => {
 return <ProList<FileInfo> pagination={{}} request={async params => {
  let r = await GetAllFile(params)
  return {
   success: r.success,
   data: r.data.list,
   total: r.data.page.total
  }
 }} metas={{
   title: {dataIndex: 'fileName'}
 }}>

 </ProList>
}


const FileSelectorTrigger: React.FC = () => {
  return <Button onClick={()=>{
    Modal.info(
      {
        content: <FileSelectorComponent/>
      }
    )
  }}>
    选择图片
  </Button>
}

export default FileSelectorTrigger