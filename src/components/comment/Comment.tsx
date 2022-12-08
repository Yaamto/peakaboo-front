import { Avatar, Divider, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import fromnow from 'fromnow';
import React, { useState, useEffect } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { like } from '../../services/CommentService';

const Comment = ({ comment, user, post, setPost }: any) => {

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { isOpen: isOpenLikes, onOpen: onOpenLikes, onClose: onCloseLikes } = useDisclosure()

    useEffect(() => {
        console.log(comment)
        comment?.likes.map((like: any) => {
            if (like?.user?._id === user?._id) {
                return setIsLiked(true)
            } else {
                return setIsLiked(false)
            }
        })
    }, [])
    const likeComment = (id: any) => {
        like(id).then((res) => {
            //récupérer l'index du commentaire
            res.post.comments.reverse()
            setPost(res.post)
            if (res.msg === "Comment liked") {
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }

        })
    }


    return (

        <Stack direction='row' h='auto' p={1} m={3} >
            <div className='flex items-center w-full justify-between'>
                <Divider orientation='vertical' />
                <div className='flex flex-col mr-auto'>
                    <div className='flex items-center'>
                        <Avatar size='sm' src={comment?.user?.profilePic !== "" && process.env.REACT_APP_API_URL + comment?.user?.profilePic} />
                        <span>{comment?.user?.username}</span>
                        <span className='text-xs ml-2'><i> - {fromnow(comment?.createdAt)}</i></span>
                    </div>
                    <Text className='ml-9'>{comment?.content}</Text>
                </div>
                <div className='flex items-center' >
                    {isLiked ? <AiFillHeart className='h-4 lg:w-5 lg:h-auto text-purpleL' onClick={() => likeComment(comment?._id)} />
                        :
                        <AiOutlineHeart className='h-4 lg:w-5 lg:h-auto text-purpleL' onClick={() => likeComment(comment?._id)} />}
                    <span className='ml-1 hover:underline' onClick={onOpenLikes}>{comment?.likes?.length}</span>
                </div>
            </div>
        </Stack>




    );
};

export default Comment;