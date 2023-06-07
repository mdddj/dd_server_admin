import { Button, Modal } from "antd";
import { ProTable } from "@ant-design/pro-components";
import { GetAllFile } from "@/services/file/FileController";
import { FileInfo } from "@/services/file/type";
import { OpenModalSelection } from "@/components/file/FileSelectorComponent";
import { GetRequestData } from "@/types/result";

///文件列表
const MyFileSelection = (props: any) => {


   return <Modal title={"选择文件"} {...props}>
      <ProTable<FileInfo>
        columns={[
          {
            dataIndex: 'url',
            title:'链接'
          },
          {
            title: "操作",
            render: () => {
              return <Button>选择文件</Button>
            }
          }
        ]}
        search={false} request={async  params => {
        let result = await  GetAllFile({...params,remove:1})
        return GetRequestData(result)
      }} pagination={{pageSize: 5}} />
    </Modal>

};

export function OpenFileSelectionModal() {
  OpenModalSelection(<MyFileSelection />)
}


