import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import {formatDistanceToNow} from "date-fns";
import {enUS, ru} from "date-fns/locale";
import axios, {AxiosResponse} from "axios";
import {API_URL} from "./Blog";
import Button from "@mui/material/Button";


interface IGovna {
    id: number,
    attributes: {
        content: any,
        createdAt: any,
        date_post: string,
        publishedAt: string,
        title: string,
        updatedAt: string
    }

}


const PostDetail = () => {
    const {id} = useParams()
    const [post, setPost] = useState<IGovna>()
    const navigate = useNavigate();

    async function fetchData() {

        try {
            const data = await axios.get(`${API_URL}/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('jwt')}`
                }
            })

            setPost(data.data.data)
        } catch (e) {
            console.error("Error fetching post:", e)
        }
    }

    useEffect(() => {
        fetchData()
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
                        <div dangerouslySetInnerHTML={{__html: post?.attributes.content}}></div>
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