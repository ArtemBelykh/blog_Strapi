import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {formatDistanceToNow} from "date-fns";
import {ru} from "date-fns/locale";
import Button from "@mui/material/Button";
import {IPost} from "../../Utils/Interfaces/post.interface";
import {strapiApi} from "../../Pages/Blog";

/**
 * Компонент PostDetail, отображающий детали поста.
 * @returns JSX.Element
 */
const PostDetail = () => {
    const { postId } = useParams(); // Получение параметра postId из маршрута
    const [post, setPost] = useState<IPost>(); // Состояние для хранения информации о посте
    const navigate = useNavigate(); // Хук для навигации между маршрутами

    useEffect(() => {
        // Получение данных о посте при загрузке компонента
        strapiApi.fetchData(`/posts/${postId}`).then(post => setPost(post));
    }, []);

    // Форматирование даты создания поста
    const formattedDate = post?.attributes.createdAt ?
        formatDistanceToNow(new Date(post.attributes.createdAt), {
            locale: ru,
            addSuffix: true,
        }) : '';

    return (
        <Grid item xs={8} md={8}>
            {/* Кнопка для перехода на предыдущую страницу */}
            <Button onClick={() => navigate(-1)}>Назад</Button>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    {/* Заголовок поста */}
                    <Typography component="h2" variant="h5">
                        {post?.attributes.title}
                    </Typography>
                    {/* Дата создания поста */}
                    <Typography variant="subtitle1" color="text.secondary">
                        {formattedDate}
                    </Typography>

                    {/* Содержимое поста */}
                    <Typography variant="subtitle2" color="text.secondary">
                        {window.sessionStorage.getItem('jwt') ? ( // Проверка аутентификации пользователя
                            <div dangerouslySetInnerHTML={{ __html: post?.attributes.content }}></div> // Отображение всего содержимого для аутентифицированных пользователей
                        ) : (
                            <>
                                {/* Отображение части содержимого для неаутентифицированных пользователей */}
                                <div dangerouslySetInnerHTML={{ __html: post?.attributes.content.substring(0, post.attributes.content.length / 2) }}></div>
                                {/* Сообщение о необходимости аутентификации */}
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    Для продолжения чтения статьи, пожалуйста, <Button color="primary" onClick={() => navigate('/login')}>авторизуйтесь</Button>.
                                </Typography>
                            </>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PostDetail;