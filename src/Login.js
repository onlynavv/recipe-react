import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from './context';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./Login.css"
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Login = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [singleUser,setSingleUser] = useState({email:'',password:''})

    const {user, isUserAuthenticated, isUserLoggedIn, userDispatch} = useGlobalContext()

    const handleLoginVariant = (variant) => () => {
        enqueueSnackbar('Login Success!', { variant });
    };

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    const history = useHistory()

    const [show, setShow] = useState(false)

    const demoShow = {
        display: show ? 'block' : 'none'
    }

    const expandMoreStyle = {
        transform: !show ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: 'all 0.5s ease'
    }

    const demoUserLogin = (e) => {
        e.preventDefault()
        setSingleUser({email:"naveen@gmail.com", password:"Password@123"})
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleUser({...singleUser, [name]:value})
    }

    const setUser = (userFromDB) => {
        userDispatch({type:"SET_USER", payload:{userFromDB}})
    }

    const handleLogin = async() => {
        try{
            const resp = await fetch('https://recipe-node-app.herokuapp.com/recipe/user/login', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(singleUser)
                })

        const data = await resp.json()
        
        setSingleUser(data.userFromDB.username)
        console.log(singleUser)
        console.log(data)

        if(resp.ok){
            const {userFromDB} = data
            console.log(userFromDB)
            localStorage.setItem("usertoken", JSON.stringify(data.userFromDB.token))
            localStorage.setItem("user", JSON.stringify(data.userFromDB))
            setUser(userFromDB)
            history.push("/")
            setSingleUser({email:'',password:''})
            console.log("login success")
            handleLoginVariant('success')
        }else{
            throw new Error(data.msg)
        }

        }

        catch(error){
            console.warn(error.toString())
        }
    }

    console.log(user)

  return (
    <section className='login-section'>
        <div className='container login-wrapper'>
            <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>User Login</h3>
                    <form className="form-wrapper">
                        <div className='form-control'>
                            <TextField className="userInput" type="email" placeholder="enter your email address" value={singleUser.email} onChange={handleChange} id="email" name="email" multiline variant="standard" />
                        </div>
                        <div className='form-control'>
                            {/* <TextField className="userInput" type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password" multiline variant="standard" /> */}
                            <input className="userInput passwordLogin" type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password"></input>
                        </div>
                        <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>login</Button>
                    </form>
                    <div className='demo-credentials'>
                        <div className='demo-credentials-header'>
                            <h4>Demo Credentials</h4>
                            <IconButton onClick={()=>{setShow(!show)}}>
                                <ExpandMoreIcon style={expandMoreStyle} />
                            </IconButton>
                        </div>
                        <div style={demoShow}>
                            <Button onClick={(e)=>demoUserLogin(e)}>User Login</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
  )
}

export default Login