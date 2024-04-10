import { useState } from 'react';
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {strapiApi} from "../../Pages/Blog";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm()


    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const onLogin = async (data: any) => {
        strapiApi.login(data).catch(error => error)
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div>
                <Typography component="h1" variant="h5" style={{textAlign: 'center', marginBottom: '20px'}}>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit(onLogin)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                value={email}
                                {...register("email")}
                                onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                {...register("password")}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{marginTop: '16px'}}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
