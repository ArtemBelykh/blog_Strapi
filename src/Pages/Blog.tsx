import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from '../Components/Layout/Header';
import MainFeaturedPost from '../Components/FeaturedPost/MainFeaturedPost';
import Sidebar from '../Components/Sidebar/Sidebar';
import Footer from '../Components/Layout/Footer';
import {useEffect, useState} from "react";
import Posts from "../Components/Posts/Posts";
import {useParams} from "react-router-dom";
import PostDetail from "../Components/Posts/PostDetail";
import {IUser} from "../Utils/Interfaces/user.interface";
import {StrapiApi} from "../Utils/strapi.api";


export const strapiApi = new StrapiApi(); // Создание экземпляра объекта StrapiApi

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
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'X', icon: XIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

/**
 * Компонент Blog, отображающий основной макет блога.
 * @returns JSX.Element
 */
export default function Blog(): JSX.Element {
    const [posts, setPosts] = useState([]); // Состояние для хранения постов
    const [showPostDetail, setShowPostDetail] = useState(false); // Состояние для отображения деталей поста
    const [user, setUser] = useState<IUser>({}); // Состояние для хранения информации о пользователе
    const { postId } = useParams(); // Получение параметра postId из маршрута

    useEffect(() => {
        // Получение данных о пользователе при наличии jwt-токена в сессии
        if (window.sessionStorage.getItem('jwt')) {
            strapiApi.getUser().then(r => setUser(r));
        }
        // Получение списка постов
        strapiApi.fetchData('/posts?populate=*').then(posts => setPosts(posts));

        // Показ деталей поста при наличии postId в маршруте
        if (postId) {
            setShowPostDetail(true);
        }
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Header title="Blog" user={user} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={6} sx={{ mt: 3 }}>
                        {/* Если нужно показать детали поста, отобразить компонент PostDetail, иначе отобразить список постов */}
                        {showPostDetail ? <PostDetail /> : (
                            <>
                                {/* Отображение списка постов */}
                                {posts.map((data: any, index) => (
                                    !postId ? <Posts key={index} post={data} /> : null
                                ))}
                            </>)
                        }
                        {/* Боковая панель с архивами и социальными сетями */}
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
    );
}