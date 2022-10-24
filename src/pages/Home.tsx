import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import PostToAdd from '../components/PostToAdd';
import { IPost } from '../interfaces/Post';
import { IUser } from '../interfaces/User';
import { getAuth } from '../services/jwtAuth';
import { getFeed } from '../services/PostService';
import "./Home.css"

const Home = ({ user, setUser }: any) => {
    const [page, setPage] = useState<number>(1)
    const [posts, setPosts] = useState<IPost[] | []>([])
    console.log(posts)

    useEffect(() => {
        getFeed(page).then(res => setPosts(res))
        setPage(page + 1)
    }, [])

    const loadPost = async () => {
        getFeed(page).then((res) => {
            let newPosts = [...posts, ...res]
            setPosts(newPosts)
            setPage(page + 1)
        })
    }

    console.log(user?.profilePic)
    return (
        <div className='h-full bg-gray-100 py-3'>
            <PostToAdd user={user} posts={posts} setPosts={setPosts} />

            {posts.map((post: any) => {

                return <div
                    className=" posts w-full bg-white flex justify-center mx-auto rounded-lg h-auto flex-col lg:w-1/2 p-4 my-2" >
                    <div className='flex items-center'>
                        <Avatar name='Dan Abrahmov' src={post.poster?.profilePic !== "" ? process.env.REACT_APP_API_URL + post.poster?.profilePic : process.env.PUBLIC_URL + "avatar" + "4" + ".svg"} />
                        <span className='ml-2'>@{post?.poster?.username}</span>
                    </div>
                    <p className='ml-16 mb-5'>{post?.content}</p>
                    {post.media.length !== 0 && <img src={process.env.REACT_APP_API_URL + post?.media} className="mx-auto w-2/3 my-7" />}
                    <div className='flex justify-around'>
                        <div className='flex items-center'>
                            <img src={process.env.PUBLIC_URL + "/comment.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                            <span className='ml-1'>{post.comments?.length} Comments</span>
                        </div>
                        <div className='flex items-center'>
                            <img src={process.env.PUBLIC_URL + "/share.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                            <span className='ml-1'>{post.reposters?.length} Shares</span>
                        </div>
                        <div className='flex items-center'>
                            <img src={process.env.PUBLIC_URL + "/heart.png"} alt="" className='h-4 lg:w-5 lg:h-auto' />
                            <span className='ml-1'>{post.likes?.length}</span>
                        </div>
                    </div>
                </div>
            })}
            <button onClick={loadPost} className="text-center">Load more</button>
        </div>
    );
};

export default Home;