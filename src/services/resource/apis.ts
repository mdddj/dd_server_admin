import { FileInfo } from '@/services/file/type';
import { ResourcesCategory } from '@/services/resource/types';
import { MyResources } from '@/types/resource';
import { CoverToPageData, JpaPage, Result } from '@/types/result';
import { formDataHeader } from '@/utils/auth';
import { objectToFormData } from '@/utils/format';
import { request } from '@umijs/max';

/**
 * 获取所有的资源分类 (分页)
 * @constructor
 */
export async function MyApiWithResourceCategoryList(
  params: any,
): Promise<Result<CoverToPageData<ResourcesCategory>>> {
  return request<Result<CoverToPageData<ResourcesCategory>>>('/api/res/list', {
    method: 'GET',
    params: params,
  });
}

/**
 * 获取所有资源分类
 * @constructor
 */
export async function MyApiWithResourceCategoryListAll(): Promise<
  Result<ResourcesCategory[]>
> {
  return request('/api/res/all', {
    method: 'GET',
  });
}

/**
 * 新增或者修改分类
 * @constructor
 */
export async function MyApiWithResourceCategoryUpdateAndSave(
  params: any,
): Promise<Result<ResourcesCategory>> {
  return request<Result<ResourcesCategory>>('/api/auth/res-cate-save', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取资源列表
 * @returns
 */
export async function MyResourceListApi(
  params: any,
): Promise<Result<JpaPage<MyResources>>> {
  return request('/api/resource/list', {
    method: 'GET',
    params,
  });
}

/**
 * 添加动态接口
 * @param params
 * @constructor
 */
export async function MyResourceAddPostApi(params: any): Promise<
  Result<{
    images: FileInfo[];
    post: MyResources;
  }>
> {
  let data = objectToFormData(params);
  return request('/api/resource/add-post', {
    method: 'POST',
    headers: formDataHeader(),
    data: data,
  });
}

/**
 * 删除资源
 */
export async function MyResourceAddDeleteApi(id: number): Promise<Result<any>> {
  return request('/api/resource/delete', {
    method: 'DELETE',
    params: {
      id,
    },
  });
}
