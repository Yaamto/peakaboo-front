import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import PostToAdd from '../components/PostToAdd';
import { IPost } from '../interfaces/Post';
import { IUser } from '../interfaces/User';
import { getAuth } from '../services/jwtAuth';
import { getFeed } from '../services/PostService';
import { Spinner } from '@chakra-ui/react'
import fromNow from 'fromnow';
import "./Home.css"
import Post from '../components/Post';

const Home = ({ user, setUser }: any) => {
    const [page, setPage] = useState<number>(1)
    const [posts, setPosts] = useState<IPost[] | []>([])
    const [loading, setLoading] = useState<Boolean>(false)


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

    return (
        <div className='h-full bg-gray-100 py-3'>
            <PostToAdd user={user} posts={posts} setPosts={setPosts} setLoading={setLoading} />
            {posts.map((post, i) => {
                return <Post post={post} posts={posts} setPosts={setPosts} loading={loading} setLoading={setLoading} user={user} key={i} />
            })}
            <button onClick={loadPost} className="">Load more</button>
        </div>
    );
};

export default Home;