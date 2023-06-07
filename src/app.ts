import { RequestConfig } from "@@/plugin-request/request";
import { getJwtToken, removeJwtToken } from "@/utils/cache";
import { history } from "@@/core/history";
import { Modal, message } from "antd";
import { HOST_NAME } from "@/constants";


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
  baseURL: HOST_NAME,
  headers: token !== null ? {
    'Authorization' : token
  } : {},
  errorConfig: {
    errorHandler(error: any, opts: any) {
      if (opts?.skipErrorHandler) throw error;
      if(error.response.status === 401){
        location.href = "/login"
        removeJwtToken()
        return
      }
      if (error.name === "BizError") {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          switch(errorInfo.type) {
            case ResultDialogType.toast:
              message.error(errorInfo.message)
              break;
            case ResultDialogType.dialog:
              Modal.error({content: errorInfo.message,title:"操作失败"})
              break
            case ResultDialogType.notice:
            case ResultDialogType.errorPage:
          }
        }
      }
    },
    errorThrower(res: ResponseStructure) {
      if (!res.success) {
        const error: any = new Error(res.message);
        error.name = "BizError";
        error.info = res;
        throw error
      }
    }
  }
};

