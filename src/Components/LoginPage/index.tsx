import { useEffect, useState } from 'react'
import LoginStyle from "./index.module.css"
import { Button, InputAdornment, Snackbar, TextField } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { authenticate } from '../../Services/Authenticate';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import UserPool from '../../Services/UserPool';

export default function LoginPage() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    useEffect(() => {
        if(UserPool.getCurrentUser()){
            navigate("/");
        }
    },[])

    const signIn = () => {
        authenticate(email, password).then(res => {
            navigate("/");
        })
            .catch(err => {
                enqueueSnackbar(err?.message, {
                    anchorOrigin : {
                        horizontal : "center",
                        vertical : "top"
                    },
                    variant : "error"
                });
            })
    }


    return (
        <div className={LoginStyle.container}>
            <div className='bg-white lg:h-96 sm:h-96 xs:h-screen lg:max-w-[400px] sm:max-w-[400px] xs:max-w-[100%] shadow-lg rounded-sm max-w-[400px] p-5'>
                <div className='p-5 text-gray-900 text-2xl text-center'>
                    LOGIN
                </div>
                <div className='p-5'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        signIn();
                    }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Email"
                            fullWidth
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon color='primary' />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                        <TextField
                            id="input-with-icon-textfield"
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            sx={{ my: "20px" }}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpenOutlinedIcon color='primary' />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />

                        <Button type='submit' fullWidth variant='contained' color='primary' sx={{ color: "white" }}>
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
