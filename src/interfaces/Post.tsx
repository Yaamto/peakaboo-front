import { IUser } from "./User";
import { IComment } from "./Comment"

export interface IPost {
    poster?: IUser,
    content?: string | any,
    sortDate?: Date,
    media?: [File] | any,
    comments?: IComment[],
    edited?: boolean,
    _id?: string,
    likes?: [],
    reposters?: IUser,
    createdAt?: Date,
    updatedAt?: Date,

}