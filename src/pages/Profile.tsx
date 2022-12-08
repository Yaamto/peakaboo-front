import { Avatar, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import { IUser } from '../interfaces/User';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import FollowingModal from '../components/FollowingModal';
import FollowersModal from '../components/FollowersModal';

const Profile = ({ user }: any) => {
    const { isOpen: isOpenFollowing, onOpen: onOpenFollowing, onClose: onCloseFollowing } = useDisclosure()
    const { isOpen: isOpenFollowers, onOpen: onOpenFollowers, onClose: onCloseFollowers } = useDisclosure()

    return (
        <div className='h-screen bg-gray-100'>
            <FollowingModal isOpen={isOpenFollowing} onClose={onCloseFollowing} user={user} />
            <FollowersModal isOpen={isOpenFollowers} onClose={onCloseFollowers} user={user} />
            <div className='bg-white w-full lg:w-1/2 mx-auto flex flex-col justify-center items-center pb-4 pt-4'>
                <Avatar size='xl' src={user?.profilePic !== "" && process.env.REACT_APP_API_URL + user?.profilePic} width="100" />
                <p>@{user?.username}</p>
                <p><i>"{user?.bio !== "" ? user?.bio : "You don't have bio yet"}"</i></p>
                <div className='flex mt-3'>
                    <span onClick={onOpenFollowers} className='mx-2'>{user?.followers.length} <strong>followers</strong></span>
                    <span onClick={onOpenFollowing}>{user?.following.length} <strong>following</strong></span>
                </div>

            </div>
            <div className='bg-white w-full lg:w-1/2 mx-auto h-screen'>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Peeks</Tab>
                        <Tab>media</Tab>
                        <Tab>likes</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>All the peeks here!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>All the media here!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>All the likes here!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;