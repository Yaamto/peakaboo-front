import React, { useState } from 'react';
import { IPost } from '../interfaces/Post';
import { post } from '../services/PostServices';


import { IUser } from '../interfaces/User';
const PostToAdd = (userInfo: IUser) => {
    console.log(userInfo)
    const [singlePost, setSinglePost] = useState<IPost>({
        content: "",
        media: []
    })


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

        let dataPost = await post(data)



    }
    return (
        <form action="" onSubmit={(e: React.FormEvent) => addPost(e, singlePost)}
            className="w-1/2 bg-white flex justify-center mx-auto rounded-lg h-auto flex-col">
            {userInfo.username}
            <input type="text" name='content' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSinglePost({ content: e.target.value, media: singlePost.media })} />
            <input type="file" name='media' id="media" multiple onChange={handleFileEvent} />
            <button type='submit'>Post</button>
        </form>
    )
};

export default PostToAdd;