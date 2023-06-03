import { request } from "@umijs/max";
import { CoverToPageData, Result } from "@/types/result";
import { ResourcesCategory } from "@/services/resource/types";

/**
 * 获取所有的资源分类
 * @constructor
 */
export async function MyApiWithResourceCategoryList( params: any) : Promise<Result<CoverToPageData<ResourcesCategory>>>{
  return request<Result<CoverToPageData<ResourcesCategory>>>('/api/res/list',{
    method: 'GET',
    params: params
  })
}

/**
 * 新增或者修改
 * @constructor
 */
export async function MyApiWithResourceCategoryUpdateAndSave( params: any): Promise<Result<ResourcesCategory>>{
  return request<Result<ResourcesCategory>>('/api/auth/res-cate-save',{
    method: 'POST',
    data: params
  })
}