import {request} from "@umijs/max";
import { CoverToPageData, Result } from "@/types/result";
import { Enterprise } from "@/types/enterprose";

export async function ApiEnterpriseCreate(params: any) {
    return request<Result<Enterprise>>('/api/enterprise/create',{
        method: 'POST',
        data: params
    })
}

/**
 * 查询公司列表
 * @param params 分页参数
 * @returns 
 */
export async function ApiEnterpriseFindList(params:any) {
    return request<Result<CoverToPageData<Enterprise>>>("/api/enterprise/list",{
      method: 'GET',
      params: params  
    })
}

/**
 * 查找全部公司
 * @constructor
 */
export async function ApiEnterpriseFindAll() {
  return request<Result<Enterprise[]>>("/api/enterprise/findAll")
}