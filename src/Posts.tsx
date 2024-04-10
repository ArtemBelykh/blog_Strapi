import React from 'react';
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import {formatDistanceToNow} from "date-fns";
import {enUS} from "date-fns/locale";
import {IPost} from "./PostDetail";


const Posts = ({post} : {post: IPost}) => {

    const formattedDate = formatDistanceToNow(new Date(post.attributes.createdAt), {
        locale: enUS,
        addSuffix: true,
    });


    // console.log(post.attributes.cover_picture.data)

    return (

        <Grid item xs={8} md={4}>
            <CardActionArea component="a" href={"/" + post.id}>
                <Card sx={{display: 'flex', position: "relative"}}>
                    <CardContent sx={{flex: 1, width: "100%", height: "300px",flexDirection: "column"}}>
                        <Typography component="h2" variant="h5">
                            {post.attributes.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{
                            position: 'absolute',
                            bottom: '20px',
                            width: '100%'}}>
                            {formattedDate}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{width: 160, display: {xs: 'none', sm: 'block'}}}
                        image={post?.attributes?.cover_picture.data !== null ? 'http://localhost:1337' + post?.attributes?.cover_picture.data.attributes.url : ""}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
};

export default Posts;