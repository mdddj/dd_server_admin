// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { RequestConfig } from "@@/plugin-request/request";
import { getJwtToken, removeJwtToken } from "@/utils/cache";
import { history } from "@@/core/history";
import { Modal, message, notification } from "antd";



export async function getInitialState(): Promise<{ name: string }> {
  return { name: "hello" };
}

export const layout = () => {
  return {
    logo: "https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg",
    menu: {
      locale: false
    }
  };
};

export function onRouteChange({ location }: any) {
  let token = getJwtToken();
  if (token === null && location.pathname !== "/login") {
    history.push("/login"); // 重定向到登录页面
  }
}

let token = getJwtToken();
export const request: RequestConfig = {
  baseURL: 'http://localhost',
  headers: token !== null ? {
    'Authorization' : token
  } : {},
  errorConfig: {
    errorHandler(error: any, opts: any) {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === "BizError") {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          message.error(errorInfo.message).then(() => {
          });
        }
        if (errorInfo?.state === 401 || errorInfo?.state === 302) {
          location.href = "/login?m=" + errorInfo?.message ?? "";
          removeJwtToken();
        }
      }
    },
    errorThrower(res: ResponseStructure) {
      if (!res.success) {
        const error: any = new Error(res.message);
        error.name = "BizError";
        error.info = res;
        
        switch(res.type) {
          case ResultDialogType.toast:
            message.error(res.message)
            break;
          case ResultDialogType.dialog:
            Modal.error({content: res.message,title:"操作失败"})
            break
          case ResultDialogType.notice:
          case ResultDialogType.errorPage:
        }
      }
    }
  }
};

interface ResponseStructure {
  state: number,
  data: any,
  message: string,
  success: boolean,
  type: ResultDialogType
}

enum  ResultDialogType {
  toast, dialog, notice, errorPage
}