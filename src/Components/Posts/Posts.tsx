import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import {formatDistanceToNow} from "date-fns";
import {ru} from "date-fns/locale";
import {IPost} from "../../Utils/Interfaces/post.interface";


/**
 * Компонент Posts, отображающий отдельный пост в списке постов.
 * @param post {IPost} - Данные о посте.
 * @returns JSX.Element
 */
const Posts = ({ post }: { post: IPost }): JSX.Element => {
    // Форматирование даты создания поста
    const formattedDate = formatDistanceToNow(new Date(post.attributes.createdAt), {
        locale: ru,
        addSuffix: true,
    });

    return (
        <Grid item xs={8} md={4}>
            {/* Область действия карточки с переходом по ссылке на пост */}
            <CardActionArea component="a" href={"/" + post.id}>
                {/* Карточка с содержимым и медиа-ресурсом */}
                <Card sx={{ display: 'flex', position: "relative" }}>
                    {/* Содержимое карточки */}
                    <CardContent sx={{ flex: 1, width: "100%", height: "300px", flexDirection: "column" }}>
                        {/* Заголовок поста */}
                        <Typography component="h2" variant="h5">
                            {post.attributes.title}
                        </Typography>
                        {/* Дата создания поста */}
                        <Typography variant="subtitle1" color="text.secondary" sx={{
                            position: 'absolute',
                            bottom: '20px',
                            width: '100%'
                        }}>
                            {formattedDate}
                        </Typography>
                    </CardContent>
                    {/* Медиа-ресурс карточки (изображение) */}
                    <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        // Проверка наличия обложки поста и формирование ссылки на изображение
                        image={post?.attributes?.cover_picture?.data !== null ? 'http://localhost:1337' + post?.attributes?.cover_picture?.data?.attributes?.url : ""}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
};

export default Posts;