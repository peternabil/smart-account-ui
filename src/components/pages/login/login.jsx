import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { login } from "../../../apis/auth";
import { showsuccess } from "../../../helpers/toast";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowPassword] = useState(false)
    const handleClickShowPassword = (setter) => setter((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const formError = () => {
        return email === '' || password.length <= 8 ? true : false
    }
    const submitRequest = () => {
        if (formError() === true) {
            console.log("errr")
        }else {
            console.log({email, password})
            login(email, password).then((res)=> {
                showsuccess("logged in")
            })
        }
    }
    return (
        <>
            <Box display={'flex'} justifyContent={'center'}>
                <Card borderRadius={5} padding={10}>
                    <CardContent padding={5}>
                        <Typography variant="h4">Sign up </Typography>
                        <Box fullWidth={true} padding={1}>
                            <TextField fullWidth={true} error={email === ''} onChange={(e) => setEmail(e.target.value)} value={email} required id="email" label="Email" variant="outlined" />
                        </Box>
                        <Box fullWidth={true} padding={1}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showpassword ? 'text' : 'password'}
                                fullWidth={true} 
                                error={password.length <= 8} 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                required 
                                label="Password" 
                                variant="outlined" 
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(e) => handleClickShowPassword(setShowPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showpassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </Box>
                        <Box fullWidth={true} padding={1}>
                            <Button disabled={formError() === true? true : false} type={'button'} onClick={submitRequest}>Submit</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default Login