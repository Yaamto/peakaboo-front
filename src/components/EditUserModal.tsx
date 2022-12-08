
import { Avatar, Button } from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
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
import { editBio, editProfilePic } from '../services/UserService';
const EditUserModal = ({ isOpen, onClose, user, me, setUser }: any) => {
    const [file, setFile] = useState<FileList | null>(null)
    const [bio, setBio] = useState<string>(user?.bio)

    console.log(user)

    const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setFile(files)
    }
    const handleSubmit = (e: React.FormEvent, file: any) => {
        e.preventDefault()
        editProfilePic(file).then(res => {
            let newUser = { ...user }
            newUser.profilePic = res.profilePic
            console.log(newUser)
            setUser(newUser)
            onClose()
        })
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value
        setBio(input)
    }
    const handleSubmitBio = (e: React.FormEvent, bio: string) => {
        e.preventDefault()
        editBio(bio).then((res) => {
            let newUser = { ...user }
            newUser.bio = res.bio
            setUser(newUser)
            onClose()
        })
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>{user?.username}'s Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='max-h-[600px] flex flex-col' >
                        <form action="" onSubmit={(e) => handleSubmit(e, file)} className="flex justify-between my-2">
                            <label htmlFor="file"
                                className='py-1 hover:cursor-pointer bg-purpleL w-36 text-center border border-purpleL rounded-lg text-white hover:bg-white hover:text-purpleL duration-300'>
                                Choose File
                            </label>
                            <input type="file" name="file" id="file" onChange={e => handleSetImage(e)} className="hidden" />
                            <button type='submit'
                                className='py-1 hover:cursor-pointer bg-purpleL w-36 text-center border border-purpleL rounded-lg text-white hover:bg-white hover:text-purpleL duration-300'>
                                Edit profile pic
                            </button>

                        </form>
                        <form action="" onSubmit={(e) => handleSubmitBio(e, bio)} className="flex justify-between my-2">
                            <input type="text" placeholder='Bio here' value={bio} onChange={e => handleChange(e)} className="mt-1 px-2 py-1 outline-0 border-b-2 border-purpleL" />
                            <button type='submit'
                                className='py-1 hover:cursor-pointer bg-purpleL w-36 text-center border border-purpleL rounded-lg text-white hover:bg-white hover:text-purpleL duration-300'>
                                Edit bio
                            </button>
                        </form>
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

export default EditUserModal;