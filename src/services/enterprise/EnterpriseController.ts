import {request} from "@umijs/max";
import {Result} from "@/types/result";

export async function ApiEnterpriseCreate(params: any) {
    return request<Result<any>>('/api/enterprise/create',{
        method: 'POST',
        data: params
    })
}