import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {formatDistanceToNow} from "date-fns";
import {ru} from "date-fns/locale";
import axios from "axios";
import {API_URL} from "./Blog";
import Button from "@mui/material/Button";


export interface IPost {
    id: number,
    attributes: {
        content: any,
        createdAt: any,
        date_post: string,
        publishedAt: string,
        title: string,
        updatedAt: string,
        cover_picture: {
            data: {
                attributes: {
                    url?: string
                }
            }
        }
    }

}


const PostDetail = () => {
    const {id} = useParams()
    const [post, setPost] = useState<IPost>()
    const navigate = useNavigate();

    async function fetchData() {

        try {
            const data = await axios.get(`${API_URL}/posts/${id}`)

            return data.data.data
        } catch (e) {
            console.error("Error fetching post:", e)
        }
    }

    useEffect(() => {
        fetchData().then(r => setPost(r))

    }, [])

    // const {data} = post

    const formattedDate = post?.attributes.createdAt ?
        formatDistanceToNow(new Date(post.attributes.createdAt), {
            locale: ru,
            addSuffix: true,
        }) : '';


    return (
        <Grid item xs={8} md={8}>
            <Button onClick={() => navigate(-1)}>Назад</Button>
            <Card sx={{display: 'flex'}}>
                <CardContent sx={{flex: 1}}>
                    <Typography component="h2" variant="h5">
                        {post?.attributes.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {formattedDate}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                        {window.sessionStorage.getItem('jwt') ? (
                            <div dangerouslySetInnerHTML={{__html: post?.attributes.content}}></div>
                        ) : (
                            <>
                                <div dangerouslySetInnerHTML={{ __html: post?.attributes.content.substring(0, post.attributes.content.length / 2) }}></div>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    Для продолжения чтения статьи, пожалуйста, <Button color="primary" onClick={() => navigate('/login')}>авторизуйтесь</Button>.
                                </Typography>
                            </>
                        )}
                    </Typography>
                </CardContent>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    sx={{width: 160, display: {xs: 'none', sm: 'block'}}}*/}
                {/*    // image={post.image}*/}
                {/*    // alt={post.imageLabel}*/}
                {/*/>*/}
            </Card>
        </Grid>
    );
};

export default PostDetail;