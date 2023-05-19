import { BlogCategory } from "@/types/blog";
import { Result } from "@/types/result";
import { request } from "@umijs/max";

/**
 * 获取播客分类
 */
export async function GetBlogCategorys() : Promise<Result<BlogCategory[]>> {
     return request<Result<BlogCategory[]>>("/api/blog/category-list")
}