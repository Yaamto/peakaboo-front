export interface IUser {
    _id?: string,
    username?: string,
    email?: string,
    password?: string,
    isAdmin?: string,
    profilePic?: string,
    bio?: string,
    followers?: string[],
    following?: string[],
    likes?: string[],
    repost?: string[],
    createdAt?: Date,
    updatedAt?: Date
}