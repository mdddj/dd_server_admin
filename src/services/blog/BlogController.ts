import { Blog, BlogCategory } from "@/types/blog";
import { CoverToPageData, Result } from "@/types/result";
import { request } from "@umijs/max";

/**
 * 获取播客分类
 */
export async function GetBlogCategorys(): Promise<Result<BlogCategory[]>> {
  return request<Result<BlogCategory[]>>("/api/blog/category-list");
}

/**
 * 发布博客
 * @param params 参数
 * @constructor
 */
export async function PushOneBlog(params: any) : Promise<Result<string>> {
  return request<Result<string>>("/api/auth/blog-push-new", {
    method: "POST",
    data: params
  });
}


/**
 * 获取博客列表
 * @param params
 * @constructor
 */
export async function GetBlogList(params: any) : Promise<Result<CoverToPageData<Blog>>> {
  return request<Result<CoverToPageData<Blog>>>("/api/blog/list",{
    method: 'GET',
    params
  })
}

/**
 * 获取博客信息
 * @param id
 * @constructor
 */
export async  function GetBlogById(id: string) : Promise<Result<Blog>>{
  return request<Result<Blog>>('/api/blog/get/'+id)
}