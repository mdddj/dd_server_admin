import React from 'react';
import {ProFormSelect, ProTable} from "@ant-design/pro-components";
import {User, Vip} from "@/types/user";
import {Space, Tag} from "antd";
import UpdateFromModal from "@/components/users/form/Update";
import {ApiQueryUserList} from "@/services/user/UserController";

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
                        dataIndex: 'nickName',
                        render: (_, entity, number, action) => {
                            return <Space>
                                <span>{entity.nickName}</span>
                                <UpdateFromModal<{ nickName: string }> title={'修改昵称'} name={'nickName'}
                                                                       initValue={entity.nickName} label={'输入昵称'}
                                                                       id={entity.id}
                                                                       onSuccess={() => action?.reload()}/>
                            </Space>
                        }
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
                        dataIndex: 'vip',
                        render: (dom, entity, number, action) => {
                            let text = <span></span>;
                            switch (entity.vip) {
                                case Vip.no : {
                                    text = <span>未开通</span>
                                    break
                                }
                                case Vip.vip : {
                                    text = <Tag color={'blue'}>普通会员</Tag>
                                    break
                                }
                                case Vip.super: {
                                    text = <Tag color={'purple'}>企业会员</Tag>
                                    break
                                }
                            }
                            return <Space>
                                {text}
                                <UpdateFromModal<{ vip: string }> title={'修改账号会员类型'}
                                                                  initValue={entity.nickName}
                                                                  id={entity.id}
                                                                  dom={<ProFormSelect options={[
                                                                      {
                                                                          label: '普通会员 (20/月)',
                                                                          value: 1
                                                                      },
                                                                      {
                                                                          label: '企业会员 (188/月)',
                                                                          value: 2
                                                                      }
                                                                  ]} name={'vip'} initialValue={entity.vip}>

                                                                  </ProFormSelect>}
                                                                  onSuccess={() => action?.reload()}/>
                            </Space>
                        }
                    },
                    {
                        key: 'openAiTokens',
                        title: 'Tokens余额',
                        dataIndex: 'openAiTokens',
                        render: (dom, entity, number, action) => {
                            return <Space>
                                {!entity.openAiTokens && <span>0</span>}
                                {entity.openAiTokens && <span>{entity.openAiTokens}</span>}
                                <UpdateFromModal initValue={entity.openAiTokens?.toString() ?? '0'} title={'充值token'}
                                                 id={entity.id} onSuccess={() => action?.reload()} name={'tokens'}
                                                 tigger={<a>充值</a>}/>
                            </Space>
                        }
                    },
                    {
                        key: 'status',
                        title: '账号状态',
                        dataIndex: 'status'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: () => {
                            return <Space>
                                <a>删除</a>
                            </Space>
                        }
                    }
                ]}
            />
        </div>
    );
}
