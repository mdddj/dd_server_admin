import { HOST_NAME } from '@/constants';
import { getJwtToken, removeJwtToken } from '@/utils/cache';
import { history } from '@@/core/history';
import {
  AxiosError,
  AxiosResponse,
  RequestConfig,
  RequestError,
  RequestOptions,
} from '@@/plugin-request/request';
import { Modal, message } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import updateLocale from 'dayjs/plugin/updateLocale';
import { Result, ToastType } from './types/result';

dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});
interface ResponseStructure {
  state: number;
  data: any;
  message: string;
  success: boolean;
  type: ToastType;
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
  responseInterceptors: [
    (response: AxiosResponse) => {
      message.destroy();
      if (response.status === 200) {
        let data = response.data as Result<any>;
        if (data.type === ToastType.FinnalToast) {
          message.success(data.message);
        } else if (data.type === ToastType.FinnalDialog) {
          Modal.success({
            content: data.message,
          });
        }
      }
      return response;
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
              case ToastType.Toast:
                message.error(errorInfo.message);
                break;
              case ToastType.Dialog:
                Modal.error({ content: errorInfo.message, title: '操作失败' });
                break;
              case ToastType.None:
              case ToastType.Notice:
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
