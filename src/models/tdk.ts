export interface DTKDetail {
  id?: number;
  appKey: string;
  appSecret: string;
  title?: string;
  intro?: string;
  selectDefault?: boolean;
  logo?: string;
}

/**
 * 设置默认账号的参数
 */
export interface SetDefaultDtkAccountParam {
  /**
   * true: 启用, false: 取消启用
   */
  action: boolean;
  /**
   * ID
   */
  id: number;
}
