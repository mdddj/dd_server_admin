import { CoverToPageData, Result } from "@/types/result";
import { request } from "@umijs/max";
import { FileInfo } from "./type";


///获取全部文件
export async function GetAllFile(params: any) : Promise<Result<CoverToPageData<FileInfo>>> { 
    return request<Result<CoverToPageData<FileInfo>>>("/api/file/list",{
        params
    })
}

/**
 * 删除某个文件
 * @param id fileInfo id
 * @constructor
 */
export async function DeleteFileById(id: number) {
    return request("/api/storage/delete",{
        method: 'DELETE',
        params: {id}
    })
}