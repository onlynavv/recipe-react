import React,{useState, useEffect} from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import "./Navbar.css"
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';

const Navbar = () => {

    const history = useHistory()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {isUserAuthenticated, userDispatch} = useGlobalContext()

  const userLogout = () => {
    localStorage.clear()
    userDispatch({type:"LOGOUT_USER"})
    history.push("/")
}

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
        <MuiAppBar className="navbar navbar-background">
            <div className='nav-center'>
                <div className='nav-header'>
                    <IconButton onClick={openSidebar}>
                        <DehazeIcon />
                    </IconButton>
                </div>
                <Typography className='links-container'>
                    <h1><i>Chefie's</i></h1>
                    <img src="https://cdn-icons-png.flaticon.com/512/6432/6432741.png" alt='logo'></img>
                </Typography>
            </div>
        </MuiAppBar>

        <aside variant="persistent" className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
            <div className='sidebar-header'>
                <IconButton className='close-btn' onClick={closeSidebar}>
                    <CloseIcon />
                </IconButton>
            </div>
            <ul className='links'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    {isUserAuthenticated && <Link to="/yourRecipies">My Recipies</Link>}
                </li>
                <li>
                    {isUserAuthenticated && <Link to="/newRecipe">New Recipe</Link>}
                </li>
                <li>
                    {isUserAuthenticated && <Link to="/saved">Saved</Link>}
                </li>
                <li>
                    {isUserAuthenticated ? <p onClick={userLogout}>User Logout</p> : <Link to="/login">User Login</Link>}
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </aside>
    </>
  )
}

export default Navbar