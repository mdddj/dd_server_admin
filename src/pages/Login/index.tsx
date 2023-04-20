import React, {CSSProperties, useState} from 'react';
import {Divider, message, Space, Tabs} from "antd";
import {setJwtToken} from "@/utils/cache";
import {useModel} from "@umijs/max";
import {history} from "@@/exports";

import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined
} from "@ant-design/icons";
import {LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText} from "@ant-design/pro-components";
import {ApiLogin} from "@/services/user/UserController";


type LoginType = 'phone' | 'account';
const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

export default function Page() {

    const {setInitialState} = useModel("@@initialState")
    const doLogin = async (values: any) => {
        let hide = message.loading("正在登录")
        try {
            let result = await ApiLogin({...values, loginType: 'account'})
            hide()
            console.log(result)
            setJwtToken(result.data.token)
            setInitialState(result.data.user)
            history.push('/home')
        } catch (e) {
            hide()
        }
    }

    const [loginType, setLoginType] = useState<LoginType>('account');
    return (
        <div style={{backgroundColor: 'white'}}>
            <LoginForm
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="VCM-AI"
                subTitle="后台管理平台"
                onFinish={doLogin}
                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Divider plain>
              <span style={{color: '#CCC', fontWeight: 'normal', fontSize: 14}}>
                其他登录方式
              </span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <AlipayOutlined style={{...iconStyles, color: '#1677FF'}}/>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <TaobaoOutlined style={{...iconStyles, color: '#FF6A10'}}/>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <WeiboOutlined style={{...iconStyles, color: '#333333'}}/>
                            </div>
                        </Space>
                    </div>
                }
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    items = {[
                        {
                            label: '账号密码登录',
                            key: 'account',

                        },
                        {
                            label: "手机号登录",
                            key: 'phone'
                        }
                    ]}
                />
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="loginNumber"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'}/>,
                            }}
                            name="mobile"
                            placeholder={'手机号'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={'请输入验证码'}
                            captchaTextRender={(timing: any, count: any) => {
                                if (timing) {
                                    return `${count} ${'获取验证码'}`;
                                }
                                return '获取验证码';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginForm>
        </div>
    );
}
