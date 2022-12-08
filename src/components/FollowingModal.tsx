import React from 'react';
import { Avatar, Button } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const FollowingModal = ({ isOpen, onClose, user }: any) => {

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>{user?.username}'s following</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='max-h-[600px] overflow-auto'>
                        {user?.following?.map((guy: any, i: number) => {
                            return <Link to={`/profile/${guy?._id.replace(/\s+/g, '').trim()}`} onClick={() => onClose()} key={i}>
                                <div className='border-b p-1 rounded flex items-center hover:bg-gray-300 hover:cursor-pointer duration-100 '>
                                    <Avatar size='lg' src={guy?.profilePic !== "" && process.env.REACT_APP_API_URL + guy?.profilePic} />
                                    <div className='ml-3 flex flex-col'>
                                        <span>@{guy?.username}</span>
                                        <span className='text-gray-400'>{guy?.bio}</span>
                                    </div>
                                </div>
                            </Link>



                        })}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default FollowingModal;