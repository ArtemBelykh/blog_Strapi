import {IPost} from "./post.interface";

export interface IPostsCategory {
    id: number,
    attributes: {
        posts: {
            data: IPost[]
        }
        url: string
    }
}