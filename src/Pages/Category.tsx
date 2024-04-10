import {useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import {useParams} from "react-router-dom";
import PostDetail from "../Components/Posts/PostDetail";
import Posts from "../Components/Posts/Posts";
import Grid from "@mui/material/Grid";
import {strapiApi} from "./Blog";
import {IPostsCategory} from "../Utils/Interfaces/postCategory.interface";

const defaultTheme = createTheme();

/**
 * Компонент Category, отображающий посты по выбранной категории.
 * @returns JSX.Element
 */
const Category = (): JSX.Element => {
    const { category, categoryId, postId } = useParams(); // Получение параметров маршрута
    const [showPostDetail, setShowPostDetail] = useState(false); // Состояние для отображения деталей поста
    const [posts, setPosts] = useState<IPostsCategory>(); // Состояние для хранения постов категории

    useEffect(() => {
        // Получение данных о постах по выбранной категории
        strapiApi.fetchData(`/post-categories/${categoryId}?populate=*`).then(postByCategory => setPosts(postByCategory));

        // Показ деталей поста, если postId определен в маршруте
        if (postId) {
            setShowPostDetail(true);
        }
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="xl">
                <Header title="Blog" />
                <main>
                    <Grid container spacing={6} sx={{ mt: 3 }}>
                        {/* Показывать детали поста, если postId определен, иначе отображать список постов */}
                        {
                            posts?.attributes.url === category &&
                            showPostDetail ? <PostDetail /> : (
                                <>
                                    {/* Отображение списка постов */}
                                    {posts?.attributes?.posts?.data.map((data: any, index) => (
                                        !postId ? <Posts key={index} post={data} /> : null
                                    ))}
                                </>)
                        }
                    </Grid>
                </main>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
};

export default Category;
