import React, { useState } from 'react';
import { IPost } from '../interfaces/Post';
import { post } from '../services/PostService'
import { Button, Input, Avatar, useToast } from '@chakra-ui/react'

import { IUser } from '../interfaces/User';
const PostToAdd = ({ user, posts, setPosts }: any) => {

    const [singlePost, setSinglePost] = useState<IPost>({
        content: "",
        media: [],
    })
    const toast = useToast()


    const handleUploadFiles = (files: Array<File>): void => {
        let media: Array<File> = []
        files.some((file) => {
            if (media.findIndex((f: any) => f.name === file.name) === -1) {
                media.push(file)
                setSinglePost({ content: singlePost.content, media: media })
            }
        })
    }

    const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const chosenFile: File[] = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFile)
    }
    const addPost = async (e: React.FormEvent, data: IPost | any) => {
        e.preventDefault()
        if (singlePost.content === "") {
            toast({
                title: "You can't post with no content",
                description: "Please write something in the input",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            let dataPost = await post(data)
            const NewPosts = [...posts]
            NewPosts.unshift(dataPost)
            setPosts(NewPosts)
            let form: any = document.getElementById("post-form")
            form.reset()
            singlePost.content = ""
            singlePost.media = ""
        }
    }
    console.log(user?.profilePic)
    return (
        <form id="post-form" action="" onSubmit={(e: React.FormEvent) => addPost(e, singlePost)}
            className="w-full bg-white flex justify-center mx-auto rounded-lg h-auto flex-col lg:w-1/2 p-4">
            <div className='flex items-center'>
                <Avatar name='Dan Abrahmov' src={user?.profilePic !== "" ? process.env.REACT_APP_API_URL + user?.profilePic : process.env.PUBLIC_URL + "avatar" + "4" + ".svg"} />
                <span>@{user?.username}</span>
            </div>
            <input type="text" name='content' className='mx-4 my-4 px-2 py-1 border rounded-lg outline-none' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSinglePost({ content: e.target.value, media: singlePost.media })} placeholder="Write something here...." />
            <label htmlFor="media" className='hover:cursor-pointer'>Choose file</label>
            <input type="file" name='media' id="media" className='hidden' multiple onChange={handleFileEvent} />
            <button type='submit' className='self-center bg-purpleD rounded-lg text-white py-2 px-6 hover:bg-purpleL duration-300'>Peek</button>
        </form>
    )
};

export default PostToAdd;