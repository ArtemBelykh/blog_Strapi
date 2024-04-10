import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {MainFeaturedPostProps} from "../../Utils/Interfaces/mainFeaturedPost.interface";


/**
 * @param props - Реквизит для основного компонента избранной публикации, включая объект публикации, содержащий информацию об основной избранной публикации
 */
export default function MainFeaturedPost(props: MainFeaturedPostProps) { // Определение компонента MainFeaturedPost с типом props MainFeaturedPostProps
    const { post } = props; // Деструктуризация объекта props, извлечение свойства post

    return (
        <Paper // Компонент Paper из Material-UI, который используется для создания карточки
            sx={{ // Стилизация компонента Paper с помощью системы тем Material-UI
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${post.image})`, // Установка фонового изображения с помощью свойства backgroundImage и значения из post.image
            }}
        >
            {/* Увеличение приоритета фонового изображения */}
            {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />} // Элемент img с атрибутами style и alt, используется для увеличения приоритета фонового изображения

            <Box // Компонент Box из Material-UI, используется для создания блочного контейнера
                sx={{ // Стилизация компонента Box с помощью системы тем Material-UI
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            {/*Компонент Grid из Material-UI, который создает контейнер с сеткой*/}
            <Grid container>
                {/* Элемент сетки, который занимает половину ширины на экранах md и больше*/}
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 }, // Отступы для разных размеров экрана
                            pr: { md: 0 }, // Правый отступ только для экранов md и больше
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {post.description}
                        </Typography>
                        <Link variant="subtitle1" href="#">
                            {post.linkText}
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}