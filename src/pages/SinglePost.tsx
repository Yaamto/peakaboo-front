import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import { IPost } from '../interfaces/Post';
import { IComment } from '../interfaces/Comment';
import { singlePost } from '../services/PostService';
import { comment, like } from '../services/CommentService';
import { HiArrowLeft } from "react-icons/hi"
import { Avatar, Divider, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import fromnow from 'fromnow';
import Comment from '../components/comment/Comment';
const SinglePost = ({ user }: any) => {
    const [post, setPost] = useState<IPost | any>(null)
    const [loader, setLoader] = useState(true)

    const [commentState, setCommentState] = useState<IComment | any>({
        content: ""
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    useEffect(() => {
        singlePost(id).then((res) => {
            res.data.comments.reverse()
            setPost(res.data)
            setTimeout(() => {
                setLoader(false)
            }, 300);

        })
    }, [])

    const commentPost = (data: any, id: any) => {
        if (data !== "") {
            comment(data, id).then((res) => {
                let newPost = { ...post }
                newPost?.comments?.unshift(res.data)
                setPost(newPost)
            })
        } else {
            toast({
                title: 'No content provided.',
                description: "You must write something before comment",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

    }

    if (loader === true) {
        return <div className='flex justify-center items-center h-screen'><Spinner /></div>
    }

    return (
        <div className='h-screen bg-gray-100 py-3'>
            <div className='lg:flex lg:justify-center mb-2'>
                <div className="p-4 w-12 border rounded-full bg-white hover:cursor-pointer text-center hover:border hover:bg-gray-300 " onClick={() => navigate("/")}><HiArrowLeft /></div>
            </div>
            <Post post={post} setPost={setPost} user={user} />
            <div className='w-full bg-white flex justify-center mx-auto rounded-lg h-auto flex-col lg:w-2/5 p-2 lg:p-4'>
                <div className='flex items center my-4'>
                    <input type="text" name='content' className='bg-gray-100 mx-4 px-2 py-1 border rounded-2xl outline-none w-3/4' placeholder='Comment here ...' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentState({ content: e.target.value })} />
                    <button
                        className='border border-purpleL py-1 px-4 rounded-2xl bg-purpleL text-white hover:bg-transparent hover:text-purpleL'
                        onClick={() => commentPost(commentState?.content, post?._id)}>Comment</button>
                </div>
                <div className='overflow-auto max-h-[400px] lg:max-h-[500px]'>
                    {post?.comments?.length === 0 ? ("There is not comments yet, be the first !") : (post?.comments?.map((comment: any, i: any) => {
                        return <Comment comment={comment} user={user} key={i} post={post} setPost={setPost} />
                    }))}

                </div>
            </div>


        </div>

    );
};

export default SinglePost;