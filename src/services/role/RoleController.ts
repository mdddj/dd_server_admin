import { request } from "@@/plugin-request";
import { CoverToPageData, Result } from "@/types/result";


/**
 * 获取全部权限定义
 * @constructor
 */
export async function GetRoleListApi() {
  return request<Result<RoleApi.Role[]>>("/api/role/list")
}

/**
 * 分页获取权限列表
 * @param params
 * @constructor
 */
export async function GetRoleListApiByPage(params: any) : Promise<Result<CoverToPageData<RoleApi.Role>>> {
  return request<Result<CoverToPageData<RoleApi.Role>>>("/api/role/list-page",{
    params
  })
}

/**
 * 保存或者修改权限数据
 * @param params 参数
 * @returns 保存或者修改后的数据
 */
export async function SaveOrUpdateRole(params: RoleApi.Role) : Promise<Result<RoleApi.Role>> {
  return request<Result<RoleApi.Role>>("/api/role/save",{
    method: 'POST',
    data: params
  })
}

/**
 * 
 * 删除权限
 * @param id 权限ID
 * @returns 
 */
export async function DeleteRoleById(id: number)  {
  return request("/api/role/delete",{
    method:"DELETE",
    params: {
      id
    }
  })
}