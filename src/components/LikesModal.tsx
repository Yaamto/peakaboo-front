import { Avatar, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const LikesModal = ({ isOpen, onClose, likes }: any) => {
    console.log(likes)
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Post's likes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='max-h-[600px] overflow-auto'>
                        {likes.map((guy: any, i: number) => {
                            return <Link to={`/profile/${guy?.user?._id?.replace(/\s+/g, '').trim()}`} onClick={() => onClose()} key={i}>
                                <div className='border-b p-1 rounded flex items-center hover:bg-gray-300 hover:cursor-pointer duration-100 '>
                                    <Avatar size='lg' src={guy?.user?.profilePic !== "" && process.env.REACT_APP_API_URL + guy?.user?.profilePic} />
                                    <div className='ml-3 flex flex-col'>
                                        <span>@{guy?.user?.username}</span>
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

export default LikesModal;