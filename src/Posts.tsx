import React from 'react';
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import {formatDistanceToNow} from "date-fns";
import {enUS} from "date-fns/locale";
import {useParams} from "react-router-dom";
const Posts = (post: any) => {
    const {id} = useParams()

    const formattedDate = formatDistanceToNow(new Date(post.post.createdAt), {
        locale: enUS,
        addSuffix: true,
    });

    // console.log(post)

    return (

        <Grid item xs={8} md={4}>
            <CardActionArea component="a" href={"/" + post.id}>
                <Card sx={{display: 'flex'}}>
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {formattedDate}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{width: 160, display: {xs: 'none', sm: 'block'}}}
                        image={post.image}
                        alt={post.imageLabel}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
};

export default Posts;