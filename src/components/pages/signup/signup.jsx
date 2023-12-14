import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { signup } from "../../../apis/auth";
import { showsuccess } from "../../../helpers/toast";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [showpassword, setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)
    const handleClickShowPassword = (setter) => setter((show) => !show);
    const navigate = useNavigate()
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const formError = () => {
        return firstname === '' || lastname === '' || email === '' || password.length <= 8 || confirmpassword !== password ? true : false
    }
    const submitRequest = () => {
        if (formError() === true) {
            console.log("errr")
        }else {
            console.log({firstname, lastname, email, password, confirmpassword})
            signup(email, firstname, lastname, password).then((res)=> {
                showsuccess("signed up")
                navigate('/login')
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
                            <TextField fullWidth={true} error={firstname === ''} onChange={(e) => setFirstname(e.target.value)} value={firstname} required id="firstname" label="First name" variant="outlined" />
                        </Box>
                        <Box fullWidth={true} padding={1}>
                            <TextField fullWidth={true} error={lastname === ''} onChange={(e) => setLastname(e.target.value)} value={lastname} required id="lastname" label="Last name" variant="outlined" />
                        </Box>
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
                            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                            <OutlinedInput
                                fullWidth={true}
                                id="confirmpassword"
                                type={showconfirmpassword ? 'text' : 'password'}
                                error={confirmpassword !== password} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                value={confirmpassword} 
                                required 
                                label="Confirm Password" 
                                variant="outlined"
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(e) => handleClickShowPassword(setShowConfirmPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showconfirmpassword ? <VisibilityOff /> : <Visibility />}
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

export default Signup