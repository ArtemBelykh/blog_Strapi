import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {FooterProps} from "../../Utils/Interfaces/footer.interface";

/**
 * Функция, создающая компонент с копирайтом.
 */
function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


/**
 * Компонент Footer, отображающий подвал страницы.
 * @param props {FooterProps} - Свойства компонента Footer, включая заголовок и описание.
 * @returns JSX.Element
 */

export default function Footer(props: FooterProps) {
    const { description, title } = props; // Деструктуризация объекта props, извлечение свойств description и title

    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    {description}
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
}