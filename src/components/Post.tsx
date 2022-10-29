import { Avatar, Spinner } from '@chakra-ui/react';
import fromnow from 'fromnow';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const Post = ({ post, key, loading }: any) => {

    if (loading === true) {
        return <div className='flex m-7 justify-center h-screen'><Spinner /></div>
    }
    return (

        <div
            className=" posts w-full bg-white flex justify-center mx-auto rounded-lg h-auto flex-col lg:w-2/5 p-4 mb-2 hover:shadow-2xl shadow-blue-500/50 hover:cursor-pointer" >
            <div className='flex items-center'>
                <Link to={`/profile/${post?.poster?._id.replace(/\s+/g, '').trim()}`} key={post?._id}>
                    <Avatar src={post?.poster?.profilePic !== "" && process.env.REACT_APP_API_URL + post?.poster?.profilePic} />
                </Link>
                <span className='ml-2'>@{post?.poster?.username}</span>
                <span className='ml-2 text-xs'><i>- {fromnow(post?.createdAt, { max: 1 })}</i></span>
            </div>
            <div> <NavLink to={`/post/${post?._id?.replace(/\s+/g, '').trim()}`} key={post?._id}>
                <p className='ml-16 mb-3'>{post?.content}</p>
                {post?.media.length !== 0 && <img src={process.env.REACT_APP_API_URL + post?.media} className="mx-auto w-2/3 mb-7 mt-2 object-contain" />}
            </NavLink>
            </div>
            <div className='flex justify-around'>
                <div className='flex items-center***'>
                    <img src={process.env.PUBLIC_URL + "/comment.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                    <span className='ml-1'>{post?.comments?.length} Comments</span>
                </div>
                <div className='flex items-center'>
                    <img src={process.env.PUBLIC_URL + "/share.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                    <span className='ml-1'>{post?.reposters?.length} Shares</span>
                </div>
                <div className='flex items-center'>
                    <img src={process.env.PUBLIC_URL + "/heart.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                    <span className='ml-1'>{post?.likes?.length}</span>
                </div>
            </div>
        </div>


    );
};

export default Post;