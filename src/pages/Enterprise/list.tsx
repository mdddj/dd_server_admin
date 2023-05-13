import React from "react";
import * as EnterpriseController from "@/services/enterprise/EnterpriseController";
import {PageContainer} from "@ant-design/pro-components";
import ApiTable from "@/components/Apitable";
import { Enterprise } from "@/types/enterprose";
import { Card } from "antd";

export default function List() {
  return (
    <PageContainer title={"企业列表"}>
      <Card>
        <ApiTable<Enterprise> api={async (params) => {
          return EnterpriseController.ApiEnterpriseFindList(params);
        }} rowKey={"id"} columns={[
          {
            key: "id",
            dataIndex: "id",
            title: "ID"
          },
          {
            key: "name",
            dataIndex: "name",
            title: "企业名称"
          },
          {
            key: "profile",
            dataIndex: "profile",
            title: "介绍"
          },
          {
            key: "phone",
            dataIndex: "phone",
            title: "手机"
          },
          {
            key: "qq",
            dataIndex: "qq",
            title: "QQ"
          },
          {
            key: "wechat",
            dataIndex: "wechat",
            title: "微信"
          }
        ]} />
      </Card>
    </PageContainer>
  );
}
