import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {API_URL, IUser} from "./Blog";
import {LogoutRounded} from "@mui/icons-material";
import {Logout} from "./Components/Auth/Logout";
import {useEffect, useState} from "react";
import axios from "axios";

interface HeaderProps {
    user: IUser;
    title: string;
}

interface Category {

    id: number,
    attributes: {
        title: string,
        url: string
    }
}

const getCategory = async () => {
    try {
        const category = await axios.get(`${API_URL}/post-categories?populate=*`)
        return category.data.data
    } catch (e) {
        console.error("Error fetching category:", e)
    }
}


export default function Header(props: HeaderProps) {
    const {title, user} = props;
    const [postCategory, setPostCategory] = useState<Category[]>([])

    useEffect(() => {
        getCategory().then(postCategory => setPostCategory(postCategory))
    }, [])

    return (
        <React.Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                {!window.sessionStorage.getItem('jwt') ?
                    <Button variant="outlined" size="small" href='/login'>
                        Войти
                    </Button>
                    : <div>
                        {user.username} <LogoutRounded onClick={Logout} href={'/'}/>
                    </div>
                }
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                {postCategory.map((postCategory) => (
                    <Link
                        color="inherit"
                        noWrap
                        variant="body2"
                        href={"/" + postCategory.attributes.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {postCategory.attributes.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}