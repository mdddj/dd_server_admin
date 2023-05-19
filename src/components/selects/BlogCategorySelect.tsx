import { GetBlogCategorys } from "@/services/blog/BlogController";
import { useRequest } from "@umijs/max";
import { Select, Spin } from "antd";

const BlogCategorySelect: React.FC = () => {
    const {data,error,loading} = useRequest(()=>GetBlogCategorys());

    if(loading){
        return <Spin/>
    }

    if(error){
        return <>error: {error}</>
    }

    if(!data){
        return <>无数据</>
    }

    return <Select options={[
        ...data.map((v)=>{
            return {label: v.name,value: v.id}
        })
    ]}>

    </Select>
}

export default BlogCategorySelect