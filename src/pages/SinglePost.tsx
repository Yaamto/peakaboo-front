import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import { IPost } from '../interfaces/Post';
import { singlePost } from '../services/PostService';
import { HiArrowLeft } from "react-icons/hi"
import { Divider, Stack, Text } from '@chakra-ui/react'
const SinglePost = () => {
    const [post, setPost] = useState<IPost | null>(null)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        singlePost(id).then((res) => setPost(res.data))
    }, [])
    console.log(post?.comments?.length === 0)
    return (
        <div className='h-screen bg-gray-100 py-3'>
            <div className='lg:flex lg:justify-center mb-2'>
                <div className="p-4 w-12 border rounded-full bg-white hover:cursor-pointer text-center hover:border hover:bg-gray-300 " onClick={() => navigate("/")}><HiArrowLeft /></div>
            </div>

            <Post post={post} />

            <div className='w-full bg-white flex justify-center mx-auto rounded-lg h-auto flex-col lg:w-2/5 p-2 lg:p-4'>
                {post?.comments?.length === 0 ? ("There is not comments yet, be the first !") : (post?.comments?.map((comment) => {

                    return <Stack direction='row' h='30px' p={1}>
                        <div className='flex items-center justify-center'>
                            <Divider orientation='vertical' />
                            <Text>{comment?.content}</Text>

                            <img src={process.env.PUBLIC_URL + "/heart.png"} alt="" className='h-4 lg:w-3 lg:h-auto' />
                            <span className='ml-1'>{comment?.likes?.length} Likes</span>
                        </div>
                    </Stack>


                }))}

            </div>
        </div>

    );
};

export default SinglePost;