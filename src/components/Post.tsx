import { Avatar, Spinner, useDisclosure } from '@chakra-ui/react';
import fromnow from 'fromnow';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { like } from '../services/PostService';
import { useState, useEffect } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import LikesModal from './LikesModal';

const Post = ({ post, key, setPost, loading, posts, setPosts, user }: any) => {

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { isOpen: isOpenLikes, onOpen: onOpenLikes, onClose: onCloseLikes } = useDisclosure()
    const linkToPost = `/post/${post?._id?.replace(/\s+/g, '').trim()}`

    useEffect(() => {
        post?.likes.map((like: any) => {
            if (like?.user?._id === user?._id) {
                return setIsLiked(true)
            }
        })
    }, [])

    const likePost = (id: any) => {
        like(id).then((res: any) => {
            if (setPost !== undefined) {
                setPost(res.post)
            }
            if (posts !== undefined) {
                let newPosts = [...posts]
                const index = newPosts.indexOf(post)
                newPosts.splice(index, 1, res.post)
                setPosts(newPosts)
            }
            if (res.msg === "Like added") {
                return setIsLiked(true)
            } else {
                return setIsLiked(false)
            }
        })
    }

    if (loading === true) {
        return <div className='flex m-7 justify-center h-screen'><Spinner /></div>
    }
    return (
        <div
            className="posts w-full bg-white flex justify-center mx-auto rounded-lg h-auto flex-col lg:w-2/5 p-4 mb-2 hover:shadow-2xl shadow-blue-500/50 hover:cursor-pointer" >
            <LikesModal isOpen={isOpenLikes} onClose={onCloseLikes} likes={post?.likes} />
            <NavLink to={linkToPost} >
                <div className='flex items-center'>
                    <Link to={`/profile/${post?.poster?._id.replace(/\s+/g, '').trim()}`} >
                        <Avatar src={post?.poster?.profilePic !== "" && process.env.REACT_APP_API_URL + post?.poster?.profilePic} />
                    </Link>
                    <Link to={`/profile/${post?.poster?._id.replace(/\s+/g, '').trim()}`}>
                        <span className='ml-2 hover:underline'>@{post?.poster?.username}</span>
                    </Link>
                    <span className='ml-2 text-xs'><i>- {fromnow(post?.createdAt, { max: 1 })}</i></span>
                </div>

                <div>
                    <p className='ml-16 mb-3'>{post?.content}</p>
                    {post?.media.length !== 0 && <img src={process.env.REACT_APP_API_URL + post?.media} className="mx-auto w-2/3 mb-7 mt-2 object-contain" />}

                </div>
            </NavLink>
            <div className='flex justify-around'>
                <NavLink to={linkToPost}>
                    <div className='flex items-center'>
                        <img src={process.env.PUBLIC_URL + "/comment.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                        <span className='ml-1 hover:underline'>{post?.comments?.length} Comments</span>
                    </div>
                </NavLink>
                <div className='flex items-center'>
                    <img src={process.env.PUBLIC_URL + "/share.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                    <span className='ml-1'>{post?.reposters?.length} Shares</span>
                </div>
                <div className='flex items-center' >
                    {isLiked ? <AiFillHeart className='h-4 lg:w-5 lg:h-auto text-purpleL' onClick={() => likePost(post?._id)} />
                        :
                        <AiOutlineHeart className='h-4 lg:w-5 lg:h-auto text-purpleL' onClick={() => likePost(post?._id)} />}



                    <span className='ml-1 hover:underline' onClick={onOpenLikes}>{post?.likes?.length}</span>
                </div>
            </div>
        </div>


    );
};

export default Post;