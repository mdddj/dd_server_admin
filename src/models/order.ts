export interface UserOrder {
  id?: number;
  zheCode?: string;
  zheAccount?: string;
  zheAppKey?: string;
  zheSid?: string;
  zheIsJieSuan?: string;
  zheJieSuanTime?: string;
  zheJieSuanProfit?: string;
  zheOrderId?: string;
  zhePayTime?: string;
  zhePayPrice?: string;
  zheProfit?: string;
  zheSmsTitle?: string;
  zheRefundPrice?: string;
  zheRefundTime?: string;
  zheStatus?: string;
  zheUpdateTime?: string;
  zheType?: string;
  zheSidZtk?: string;
  zheCustomerIdZtk?: string;
  zhePlatformZtk?: string;
  zheActId?: string;
  zheSanPingTai?: string;
  zheSanPingTaiId?: string;
}

export interface DtkOrderSelectParam {
  /**
   *
   * 订单查询结束时间，订单开始时间至订单结束时间，中间时间段日常要求不超过3个小时，但如618、双11、年货节等大促期间预估时间段不可超过20分钟，超过会提示错误，调用时请务必注意时间段的选择，以保证亲能正常调用！
   * 时间格式：YYYY-MM-DD HH:MM:SS
   */
  endTime: string;
  /**
   * 跳转类型，当向前或者向后翻页必须提供,-1: 向前翻页,1：向后翻页
   */
  jumpType?: string;
  /**
   * 推广者角色类型,2:二方，3:三方，不传，表示所有角色
   */
  memberType?: string;
  /**
   * 场景订单场景类型，1:常规订单，2:渠道订单，3:会员运营订单，默认为1
   */
  orderScene?: string;
  /**
   * 第几页，默认1，1~100
   */
  pageNo?: string;
  /**
   * 页大小，默认20，1~100
   */
  pageSize?: string;
  /**
   * 位点，第一页数据返回里面有个这个字段，查第二页的数据的时候就传过去
   */
  positionIndex?: string;
  /**
   * 查询时间类型，1：按照订单淘客创建时间查询，2:按照订单淘客付款时间查询，3:按照订单淘客结算时间查询，4：按照订单更新时间（5.27新增字段）
   */
  queryType: string;
  /**
   * 订单查询开始时间。时间格式：YYYY-MM-DD HH:MM:SS
   */
  startTime: string;
  /**
   * 淘客订单状态，12-付款，13-关闭，14-确认收货，3-结算成功;不传，表示所有状态
   */
  tkStatus?: string;
}

/**
 * DtkOrderResult
 */
export interface DtkOrderResult {
  cache?: boolean;
  code?: number;
  data?: DtkOrderData;
  msg?: string;
  requestId?: string;
  time?: number;
}

/**
 * DtkOrderData
 */
export interface DtkOrderData {
  hasNext?: boolean;
  hasPre?: boolean;
  pageNo?: number;
  pageSize?: number;
  positionIndex?: string;
  results?: DtkOrderDataResults;
}

/**
 * DtkOrderDataResults
 */
export interface DtkOrderDataResults {
  publisherOrderDto?: DtkOrderDto[];
}

/**
 * DtkOrderDto
 */
export interface DtkOrderDto {
  adzoneId?: number;
  adzoneName?: string;
  alimamaRate?: string;
  alimamaShareFee?: string;
  alipayTotalPrice?: string;
  clickTime?: string;
  depositPrice?: string;
  flowSource?: string;
  incomeRate?: string;
  itemCategoryName?: string;
  itemid?: string;
  itemImg?: string;
  itemLink?: string;
  itemNum?: number;
  itemPrice?: string;
  itemTitle?: string;
  marketingType?: string;
  modifiedTime?: string;
  orderType?: string;
  payPrice?: string;
  pubid?: number;
  pubShareFee?: string;
  pubShareFeeForCommission?: number;
  pubShareFeeForSdy?: number;
  pubSharePreFee?: string;
  pubSharePreFeeForCommission?: number;
  pubSharePreFeeForSdy?: number;
  pubShareRate?: string;
  pubShareRateForSdy?: number;
  refundTag?: number;
  sellerNick?: string;
  sellerShopTitle?: string;
  siteid?: number;
  siteName?: string;
  subsidyFee?: string;
  subsidyRate?: string;
  subsidyType?: string;
  tbDepositTime?: string;
  tbPaidTime?: string;
  terminalType?: string;
  tkCreateTime?: string;
  tkDepositTime?: string;
  tkEarningTime?: string;
  tkOrderRole?: number;
  tkPaidTime?: string;
  tkStatus?: TkStatus;
  tkTotalRate?: string;
  tkTotalRateForSdy?: number;
  totalCommissionFee?: string;
  totalCommissionRate?: string;
  tradeid?: string;
  tradeParentid?: string;
  userId?: number;
}

export enum TkStatus {
  '订单付款' = 12,
  '订单结算' = 3,
  '订单失效' = 13,
  '订单成功' = 14,
}
