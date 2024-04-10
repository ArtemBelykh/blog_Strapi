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
import Sidebar from './Sidebar';
import Footer from './Footer';
import {useEffect, useState} from "react";
import axios from "axios";
import Posts from "./Posts";
import {useParams} from "react-router-dom";
import PostDetail from "./PostDetail";

export const API_URL = 'http://localhost:1337/api'

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};


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

export interface IUser {
    id?: number,
    username?: string,
    email?: string,
    provider?: string,
    confirmed?: boolean,
    blocked?: boolean,
    createdAt?: string,
    updatedAt?: string
}

export default function Blog() {
    const [posts, setPosts] = useState([])
    const [showPostDetail, setShowPostDetail] = useState(false); // Состояние для отображения деталей поста
    const [user, setUser] = useState<IUser>({})
    const {id,categories} = useParams()


    const getUser = async () => {
        try {
            const user = await axios.get(`${API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('jwt')}`
                }
            })
            return user.data[0]
        } catch (e) {
            console.error("Error fetching post:", e)
        }
    }

    async function fetchData() {

        try {
            const data = await axios.get(`${API_URL}/posts?populate=*`)
            return data.data.data
        } catch (e) {
            console.error("Error fetching post:", e)
        }
    }

    useEffect(() => {

        if (window.sessionStorage.getItem('jwt')) {
            getUser().then(r => setUser(r))
        }
        fetchData().then(r => {

            console.log(r)
            r.map((data: any) => {
                data.attributes.post_categories.data.map((category: any) => {
                    if (category.attributes.url === categories) {
                        setPosts(r)
                    }
                })
            })


        })


        if (id) {
            setShowPostDetail(true); // Если id определен, показать детали поста
        }
    }, [])


    // console.log(posts)

    return (

        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <Header user={user} title="Blog"/>
                <main>
                    <MainFeaturedPost post={mainFeaturedPost}/>
                    <Grid container spacing={6} sx={{mt: 3}}>

                        {

                            showPostDetail ? <PostDetail/> : (
                                <>
                                    {posts.map((data: any, index) => (
                                        !id ? <Posts key={index} post={data}/> : null
                                    ))}
                                </>)
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