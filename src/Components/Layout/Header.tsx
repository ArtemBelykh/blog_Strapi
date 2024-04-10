import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {LogoutRounded} from "@mui/icons-material";
import {Logout} from "../Auth/Logout";
import {Fragment, useEffect, useState} from "react";
import {ICategory} from "../../Utils/Interfaces/category.interface";
import {IHeaderProps} from "../../Utils/Interfaces/header.interface";
import {strapiApi} from "../../Pages/Blog";

/**
 * Компонент Header, отображающий заголовок и панель навигации.
 * @param props {IHeaderProps} - Свойства компонента Header, включая заголовок и информацию о пользователе.
 * @returns JSX.Element
 */
export default function Header(props: IHeaderProps): JSX.Element {
    const { title, user } = props; // Деструктуризация объекта props, извлечение свойств title и user
    const [postCategory, setPostCategory] = useState<ICategory[]>([]); // Состояние для хранения категорий постов

    useEffect(() => {
        // Запрос данных о категориях постов при загрузке компонента
        strapiApi.fetchData('/post-categories?populate=*').then(postCategory => setPostCategory(postCategory));
    }, []);

    return (
        <Fragment>
            {/* Верхняя панель с заголовком, иконкой поиска и кнопкой входа/выхода */}
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title} {/* Заголовок, полученный из props */}
                </Typography>
                <IconButton>
                    <SearchIcon /> {/* Иконка поиска */}
                </IconButton>
                {/* Проверка наличия сессии пользователя для отображения кнопки входа/выхода */}
                {!window.sessionStorage.getItem('jwt') ?
                    <Button variant="outlined" size="small" href='/login'>
                        Войти
                    </Button>
                    :
                    <div>
                        {user?.username} {/* Имя пользователя */}
                        <LogoutRounded onClick={Logout} href={'/'} /> {/* Кнопка выхода с именем пользователя */}
                    </div>
                }
            </Toolbar>
            {/* Нижняя панель навигации с категориями постов */}
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {/* Маппинг категорий постов для отображения ссылок */}
                {postCategory.map((postCategory) => (
                    <Link
                        key={postCategory.id}
                        color="inherit"
                        noWrap
                        variant="body2"
                        href={"/category/" + postCategory.attributes.url + "/" + postCategory.id}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {postCategory.attributes.title} {/* Название категории */}
                    </Link>
                ))}
            </Toolbar>
        </Fragment>
    );
}