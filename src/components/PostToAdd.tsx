import React, { useState } from 'react';
import { IPost } from '../interfaces/Post';
import { post } from '../services/PostService'
import { Button, Input, Avatar, useToast } from '@chakra-ui/react'
const PostToAdd = ({ user, posts, setPosts, setLoading }: any) => {

    const [singlePost, setSinglePost] = useState<IPost>({
        content: "",
        media: [],
    })
    const [fileNumber, setFileNumber] = useState<number>(0)


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
        console.log(chosenFile)
        setFileNumber(chosenFile.length)
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
            setLoading(true)
            let dataPost = await post(data)
            const NewPosts = [...posts]
            NewPosts.unshift(dataPost)
            setFileNumber(0)
            setTimeout(() => {
                setPosts(NewPosts)
                setLoading(false)
            }, 700)

            let form: any = document.getElementById("post-form")
            form.reset()
            singlePost.content = ""
            singlePost.media = ""
        }
    }

    return (
        <form id="post-form" action="" onSubmit={(e: React.FormEvent) => addPost(e, singlePost)}
            className=" mb-2 w-full bg-white flex justify-center mx-auto rounded-lg h-auto flex-col lg:w-1/2 p-4 hover:shadow-2xl shadow-blue-500/50">
            <div className='flex items-center'>
                <Avatar size="lg" src={user?.profilePic !== "" && process.env.REACT_APP_API_URL + user?.profilePic} />
                <span className='ml-2'>@{user?.username}</span>
            </div>
            <input type="text" name='content' className='mx-4 my-4 px-2 py-1 border rounded-lg outline-none' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSinglePost({ content: e.target.value, media: singlePost.media })} placeholder="Write something here...." />
            <label htmlFor="media" className='py-1 hover:cursor-pointer bg-purpleL w-36 text-center border border-purpleL rounded-lg text-white hover:bg-white hover:text-purpleL duration-300'>
                {fileNumber > 0 ? fileNumber + " file(s) chosen" : "Choose file"}
            </label>
            <input type="file" name='media' id="media" className='hidden' multiple onChange={handleFileEvent} />
            <button type='submit' className='self-center bg-purpleL rounded-lg text-white py-2 px-6 border border-purpleL hover:bg-white hover:text-purpleL duration-300'>Peek</button>
        </form>
    )
};

export default PostToAdd;