import { IUser } from "./User";

export interface IPost {
    poster?: IUser,
    content?: string | any,
    sortDate?: Date,
    media?: [File] | any,
    comments?: [],
    edited?: boolean,
    _id?: string,
    likes?: [],
    reposters?: IUser,
    createdAt?: Date,
    updatedAt?: Date,

}