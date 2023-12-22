import React from 'react';
import {Card} from "antd";
import ApiTable from "@/components/Apitable";
import {Version} from "@/models/Version";
import {request} from "@umijs/max";
import {CoverToPageData, Result} from "@/types/result";



 async function list(params:any):Promise<Result<CoverToPageData<Version>>>{
    return request<Result<CoverToPageData<Version>>>('/api/version/list',{
        method: 'GET',
        params: params
    })
}

const Page = () => {
    
    
    const fetchData = (params: any) => {
      return list(params);
    };
    
    return (
        <Card>
            <ApiTable<Version> api={fetchData} rowKey={'id'} columns={
                [
                    {
                        "key": "id",
                        "dataIndex": "id",
                        "title": "主键"
                    },
                    {
                        "key": "title",
                        "dataIndex": "title",
                        "title": "标题"
                    },
                    {
                        "key": "description",
                        "dataIndex": "description",
                        "title": "更新记录"
                    },
                    {
                        "key": "downloadUrl",
                        "dataIndex": "downloadUrl",
                        "title": "下载地址(直链)"
                    },
                    {
                        "key": "platform",
                        "dataIndex": "platform",
                        "title": "平台"
                    },
                    {
                        "key": "createDate",
                        "dataIndex": "createDate",
                        "title": "创建时间"
                    },
                    {
                        "key": "htmlViewPage",
                        "dataIndex": "htmlViewPage",
                        "title": "第三方下载地址"
                    },
                    {
                        "key": "packageSize",
                        "dataIndex": "packageSize",
                        "title": "包大小"
                    },
                    {
                        "key": "enable",
                        "dataIndex": "enable",
                        "title": "是否有效"
                    },
                    {
                        "key": "disabled",
                        "dataIndex": "disabled",
                        "title": "是否有效"
                    },
                    {
                        "key": "versionNumber",
                        "dataIndex": "versionNumber",
                        "title": "版本号"
                    },
                    {
                        "key": "projectName",
                        "dataIndex": "projectName",
                        "title": "项目名称"
                    }
                ]
            }/>
        </Card>
    )
}
export default Page

