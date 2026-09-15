import React, { useState } from 'react';
import axios from "axios"
import {toast} from "react-toastify"
import {TextField,Button} from "@mui/material"

const Login = () => {
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [errorEmail,setErrorEmail] = useState<string>("")
    const [errorPassword,setErrorPassword] = useState<string>("")

     const validateFields = () => {
  let checkEmail = false;
  let checkPwd = false;

  if (!email) {
    setErrorEmail("Email Field must be filled");
  } else {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    checkEmail = regex.test(email);

    if (!checkEmail) {
      setErrorEmail("Invalid Email");
    }
    else{
      setErrorEmail("")
    }
    
  }

  if (!password) {
    setErrorPassword("Password Field must be filled");
  } else {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };

    checkPwd =
      checks.length &&
      checks.lowercase &&
      checks.uppercase &&
      checks.digit &&
      checks.special;

    if (!checkPwd) {
      setErrorPassword("Password does not meet the requirements.");
    }
    else{
      setErrorPassword("")
    }
    
  }

  return checkEmail && checkPwd;
    };

    const handleLogin = async() =>{
        const isValidate = validateFields()

        if(isValidate === false) return

        try {
            const {data} = await axios.post(`/auth/login`,{email:email,password:password})
            
            if(data?.success){
                toast.success(data?.msg)
            }
            else{
                toast.error(data?.msg)
            }
        } catch (error) {
            console.error("Error in handleLogin",error)
        }
    }

  return (
    <div>
    
    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"  value={email}/>
    
    <TextField id="outlined-basic" label="Outlined" variant="outlined"  value={password}/> */}

        <Button variant="contained">Login</Button>

    </div>
  );
}

export default Login;

