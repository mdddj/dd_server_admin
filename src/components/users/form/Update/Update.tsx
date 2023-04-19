import React from 'react'
import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Button} from "antd";

type UpdateFromProp<T> = {
    initValue: string,
    label: string,
    name: string,
    buttonText: string,
    title: string,
    onFinish: (values: T) => Promise<boolean>
}
export default class UpdateFromModal<T> extends React.Component<UpdateFromProp<T>> {
    render() {
        return <ModalForm<T>
            width={300}
            title={this.props.title}
            trigger={
                <Button>
                    {this.props.buttonText}
                </Button>
            }
            autoFocusFirstInput={true}
            modalProps={{
                destroyOnClose: true
            }}
            onFinish={this.props.onFinish}
        >
            <ProFormText key={this.props.name} name={this.props.name} label={this.props.label}
                         initialValue={this.props.initValue}></ProFormText>
        </ModalForm>
    }
}
