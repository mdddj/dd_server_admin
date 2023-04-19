import React from 'react';
import {ApiQueryUserList} from "@/services/user";
import {ProTable} from "@ant-design/pro-components";
import {User} from "@/types/user";
import {Dropdown, Space} from "antd";
import UpdateFromModal from "@/components/users/form/Update";

export default function Page() {
    return (
        <div>
            <ProTable<User, any>
                rowKey={"id"}
                request={async (params) => {
                    console.log(params)
                    let result = await ApiQueryUserList({...params, page: params.current - 1})
                    return {
                        success: result.success,
                        data: result.data.list,
                        total: result.data.page.total
                    }
                }}
                columns={[
                    {
                        key: 'id',
                        title: 'id',
                        dataIndex: 'id'
                    },
                    {
                        key: 'loginNumber',
                        title: '用户名',
                        dataIndex: 'loginNumber'
                    },
                    {
                        key: 'nickName',
                        title: '昵称',
                        dataIndex: 'nickName'
                    },
                    {
                        key: 'email',
                        title: '邮箱',
                        dataIndex: 'email'
                    },
                    {
                        key: 'phone',
                        title: '手机',
                        dataIndex: 'phone'
                    },
                    {
                        key: 'loginTime',
                        title: '登录时间',
                        dataIndex: 'loginTime'
                    },
                    {
                        key: 'openAiFlag',
                        title: 'AI会员',
                        dataIndex: 'openAiFlag',
                        valueType: "checkbox"
                    },
                    {
                        key: 'wallet',
                        title: '钱包余额',
                        dataIndex: 'wallet'
                    },
                    {
                        key: 'vip',
                        title: '会员类型',
                        dataIndex: 'vip'
                    },
                    {
                        key: 'openAiTokens',
                        title: 'AI余量',
                        dataIndex: 'openAiTokens'
                    },
                    {
                        key: 'status',
                        title: '账号状态',
                        dataIndex: 'status'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (dom, entity) => {
                            return <Space>
                                <UpdateFromModal<{ nickName: string }> title={'修改昵称'} name={'nickName'}
                                                                       initValue={entity.nickName} label={'输入昵称'}
                                                                       buttonText={'修改昵称'}
                                                                       onFinish={async values => {
                                                                           console.log(values)
                                                                           return true
                                                                       }}/>
                                <a>删除</a>
                            </Space>
                        }
                    }
                ]}
            />
        </div>
    );
}
