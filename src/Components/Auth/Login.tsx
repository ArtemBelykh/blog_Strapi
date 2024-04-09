import React, { useState } from 'react';
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import {API_URL} from "../../Blog";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

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

    const onSubmit = async (data: any) => {
        // Do something with email and password

        try {
            const login = await axios.post(`${API_URL}/auth/local`, {
                "identifier": data.email,
                "password": data.password
            })
            // console.log(login.data.jwt)
            window.sessionStorage.setItem('jwt', login.data.jwt)
            if (login) {
                navigate('/')
            }

        } catch (e) {
            console.error("Error fetching post:", e)
        }

        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div>
                <Typography component="h1" variant="h5" style={{textAlign: 'center', marginBottom: '20px'}}>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
