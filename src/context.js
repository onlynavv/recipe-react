import React , {useContext,useReducer} from 'react'
import { UserInitialState } from './UserInitialState'
import { UserReducer } from './UserReducer'

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    // user actions
    const isUserLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem("usertoken"))
        if(token){
            const userFromDB = JSON.parse(localStorage.getItem("user"))
            userDispatch({type:"SET_USER", payload:{userFromDB}})
        }
    }

    // user useReducer
    const [userState, userDispatch] = useReducer(UserReducer, UserInitialState)

    return(
        <AppContext.Provider value={{...userState, userDispatch, isUserLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}