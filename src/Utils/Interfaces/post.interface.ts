export interface IPost {
    id: number,
    attributes: {
        content?: any,
        createdAt?: any,
        date_post?: string,
        publishedAt?: string,
        title?: string,
        updatedAt?: string,
        cover_picture?: {
            data?: {
                attributes?: {
                    url?: string
                }
            }
        }
        post_categories?: []
    }
}