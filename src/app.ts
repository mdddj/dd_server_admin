import { HOST_NAME } from '@/constants';
import { getJwtToken, removeJwtToken } from '@/utils/cache';
import { history } from '@@/core/history';
import {
  AxiosError,
  RequestConfig,
  RequestError,
  RequestOptions,
} from '@@/plugin-request/request';
import { Modal, message } from 'antd';

interface ResponseStructure {
  state: number;
  data: any;
  message: string;
  success: boolean;
  type: ResultDialogType;
}

enum ResultDialogType {
  toast,
  dialog,
  notice,
  errorPage,
}

class ApiError extends Error {
  info: ResponseStructure;
  constructor(res: ResponseStructure) {
    super(res.message);
    super.name = 'BizError';
    this.info = res;
  }
}

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'hello' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export function onRouteChange({ location }: any) {
  let token = getJwtToken();
  if (token === null && location.pathname !== '/login') {
    history.push('/login'); // 重定向到登录页面
  }
}

export const request: RequestConfig = {
  baseURL: HOST_NAME,
  requestInterceptors: [
    (config: RequestConfig) => {
      if (config.headers) {
        config.headers['Authorization'] = getJwtToken() ?? '';
      } else {
        config.headers = {
          Authorization: getJwtToken() ?? '',
        };
      }
      return config;
    },
  ],
  errorConfig: {
    errorHandler(error: RequestError, opts: RequestOptions) {
      if (opts?.skipErrorHandler) throw error;
      console.log('进来了' + typeof error);
      if (error instanceof ApiError) {
        console.log('error 是 ApiError');
        let result = error.info;
        if (result.state === 401) {
          removeJwtToken();
          location.href = '/login';
          return;
        }
        if (error.name === 'BizError') {
          const errorInfo: ResponseStructure = error.info;
          if (errorInfo) {
            switch (errorInfo.type) {
              case ResultDialogType.toast:
                message.error(errorInfo.message);
                break;
              case ResultDialogType.dialog:
                Modal.error({ content: errorInfo.message, title: '操作失败' });
                break;
              case ResultDialogType.notice:
              case ResultDialogType.errorPage:
            }
          }
        }
      } else {
        const axiosError = error as AxiosError;
        message.error(axiosError.message);
      }
    },
    errorThrower(res: ResponseStructure) {
      console.log(res);
      if (!res.success) {
        const error = new ApiError(res);
        throw error;
      }
    },
  },
};
