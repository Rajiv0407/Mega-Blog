import { useEffect, useState } from "react";
import { Container,PostCard } from "../Components";
import { appwriteService } from '../appwrite/config'
const AllPost = () => {
    const [post,setPost]= useState([]);
    useEffect(()=>{
        appwriteService.allPost([]).then((posts)=> {
            if(posts){
                setPost(posts.documents)
            }
        })
    },[])
    return(
        <div className="w-full py-8">
            <Container>
                   <div className="flex flex-warp">
                    {
                         posts?.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard  post={post} />
                        </div>
                    ))
                    }
                   </div>
            </Container>
            </div>
    )
}
export default AllPost;  