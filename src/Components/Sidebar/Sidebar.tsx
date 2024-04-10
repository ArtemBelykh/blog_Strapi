import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {SidebarProps} from "../../Utils/Interfaces/sidebar.interface";



/**
 * Компонент Sidebar, отображающий боковую панель с архивами и социальными сетями.
 * @param props {SidebarProps} - Свойства компонента Sidebar, включая архивы и социальные сети.
 * @returns JSX.Element
 */
export default function Sidebar(props: SidebarProps): JSX.Element {
    const { archives, social } = props; // Деструктуризация объекта props, извлечение свойств archives и social

    return (
        <Grid item xs={2} md={4}>
            {/* Заголовок архивов */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Archives
            </Typography>
            {/* Отображение списка архивов */}
            {archives.map((archive) => (
                <Link display="block" variant="body1" href={archive.url} key={archive.title}>
                    {archive.title}
                </Link>
            ))}
            {/* Заголовок социальных сетей */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Social
            </Typography>
            {/* Отображение списка социальных сетей */}
            {social.map((network) => (
                <Link
                    display="block"
                    variant="body1"
                    href="#"
                    key={network.name}
                    sx={{ mb: 0.5 }}
                >
                    {/* Стек, содержащий иконку и название социальной сети */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <network.icon /> {/* Иконка социальной сети */}
                        <span>{network.name}</span> {/* Название социальной сети */}
                    </Stack>
                </Link>
            ))}
        </Grid>
    );
}
