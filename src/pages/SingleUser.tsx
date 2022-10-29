import { Avatar, Button, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../interfaces/User';
import { follow, singleUser, unfollow } from '../services/UserService';

import FollowersModal from '../components/FollowersModal';
import FollowingModal from '../components/FollowingModal';

const SingleUser = ({ me }: any) => {
    const { id }: any = useParams()
    const [user, setUser] = useState<IUser | any>(null)
    const [followers, setFollowers] = useState<number>(0)
    const [isFollow, setIsFollow] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const { isOpen: isOpenFollowing, onOpen: onOpenFollowing, onClose: onCloseFollowing } = useDisclosure()
    const { isOpen: isOpenFollowers, onOpen: onOpenFollowers, onClose: onCloseFollowers } = useDisclosure()

    useEffect(() => {
        setLoading(true)
        singleUser(id).then((res) => {
            setUser(res)
            setFollowers(res.followers.length)
            res.followers.map((user: any) => user._id == me._id ? setIsFollow(true) : setIsFollow(false))
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
    }, [id])

    const followUser = async (id: any) => {
        setIsFollow(true)
        follow(id).then((res) => {
            setFollowers(followers + 1)
        })
    }
    const unfollowUser = async (id: any) => {
        setIsFollow(false)
        unfollow(id).then((res) => {
            setFollowers(followers - 1)
        })
    }
    if (loading === true) {
        return <div className='flex items-center justify-center h-screen'><Spinner /></div>
    }

    return (
        <div>
            <FollowingModal isOpen={isOpenFollowing} onClose={onCloseFollowing} user={user} setLoading={setLoading} />
            <FollowersModal isOpen={isOpenFollowers} onClose={onCloseFollowers} user={user} />

            <div className='bg-white w-full lg:w-1/2 mx-auto flex flex-col justify-center items-center pb-4 pt-4'>
                <Avatar size='xl' src={user?.profilePic !== "" && process.env.REACT_APP_API_URL + user?.profilePic} width="100" />

                <p>@{user?.username}</p>
                <p><i>"{user?.bio !== "" ? user?.bio : "This user don't have bio yet"}"</i></p>
                <div className='flex mt-3'>
                    <span onClick={onOpenFollowers} className='mx-2 hover:cursor-pointer '>{followers} <strong>followers</strong></span>
                    <span onClick={onOpenFollowing} className="hover:cursor-pointer ">{user?.following?.length} <strong>following</strong></span>
                </div>
                {isFollow ? <button onClick={() => unfollowUser(user?._id)} className='lg:self-end lg:mr-5 border border-purpleL px-6 py-2 bg-transparent rounded-full text-purpleL mt-4'>unfollow</button>
                    :
                    <button onClick={() => followUser(user?._id)} className='lg:self-end lg:mr-5 border border-purpleL px-6 py-2 bg-purpleL rounded-full text-white mt-4'>follow</button>
                }

            </div>
            <div className='bg-white w-full lg:w-1/2 mx-auto'>
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

export default SingleUser;