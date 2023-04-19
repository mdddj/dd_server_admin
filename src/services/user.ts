import {request} from '@@/plugin-request'
import {User} from "@/types/user";
import {CoverToPageData, Result} from "@/types/result";

/**
 * 登录接口
 * @param data
 * @constructor
 */
export async function ApiLogin(data: any) {
    return request("/api/user-public/login", {
        method: 'POST',
        data
    })
}

/**
 * 获取当前登录的用户信息
 * @constructor
 */
export async function ApiGetCurrentUser(): Promise<Result<User>> {
    return request("/api/get-user-by-token")
}

/**
 * 查询用户列表
 * @param pageParam
 * @constructor
 */
export async function ApiQueryUserList(pageParam: any): Promise<Result<CoverToPageData<User>>> {
    return request('/api/user/list', {
        params: pageParam,
    })
}

/**
 * 修改用户资料
 * @param params
 * @constructor
 */
export async function ApiUpdateUserInfo(params: any) {
    return request<Result<User>>("/api/user/update", {
        method: 'POST',
        data: params
    })
}