import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';
import {useEffect, useState} from "react";
import axios from "axios";
import Posts from "./Posts";
import {useParams} from "react-router-dom";
import PostDetail from "./PostDetail";
import Login from "./Components/Auth/Login";

export const API_URL = 'http://localhost:1337/api'


const sections = [
    {title: 'Technology', url: '#'},
    {title: 'Design', url: '#'},
    {title: 'Culture', url: '#'},
    {title: 'Business', url: '#'},
    {title: 'Politics', url: '#'},
    {title: 'Opinion', url: '#'},
    {title: 'Science', url: '#'},
    {title: 'Health', url: '#'},
    {title: 'Style', url: '#'},
    {title: 'Travel', url: '#'},
];

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
];


const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        {title: 'March 2020', url: '#'},
        {title: 'February 2020', url: '#'},
        {title: 'January 2020', url: '#'},
        {title: 'November 1999', url: '#'},
        {title: 'October 1999', url: '#'},
        {title: 'September 1999', url: '#'},
        {title: 'August 1999', url: '#'},
        {title: 'July 1999', url: '#'},
        {title: 'June 1999', url: '#'},
        {title: 'May 1999', url: '#'},
        {title: 'April 1999', url: '#'},
    ],
    social: [
        {name: 'GitHub', icon: GitHubIcon},
        {name: 'X', icon: XIcon},
        {name: 'Facebook', icon: FacebookIcon},
    ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
    const [posts, setPosts] = useState([])
    const [showPostDetail, setShowPostDetail] = useState(false); // Состояние для отображения деталей поста

    async function fetchData() {

        try {
            const data = await axios.get(`${API_URL}/posts`, {
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('jwt')}`
                }
            })
            setPosts(data.data.data)
        } catch (e) {
            console.error("Error fetching post:", e)
        }
    }

    useEffect(() => {
        fetchData()


        if (id) {
            setShowPostDetail(true); // Если id определен, показать детали поста
        }
    }, [])
    const {id} = useParams()
    // console.log(posts)

    return (

        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <Header title="Blog" sections={sections}/>
                <main>
                    <MainFeaturedPost post={mainFeaturedPost}/>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post}/>
                        ))}
                    </Grid>
                    <Grid container spacing={6} sx={{mt: 3}}>
                        {
                            window.sessionStorage.getItem('jwt') ?
                                showPostDetail ? <PostDetail/> : (
                                    <>
                                        {posts.map((data: any, index) => (
                                            !id ? <Posts key={index} post={data.attributes} id={data.id}/> : null
                                        ))}
                                    </>
                                ) : "Auth"
                        }

                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    )
        ;
}