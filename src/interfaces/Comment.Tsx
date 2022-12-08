import { IUser } from "./User";

export interface IComment {
    post_id?: string,
    user?: IUser,
    content?: string,
    _id?: string,
    likes?: IUser[],
    createdAt?: Date,
    updatedAt?: Date,
}