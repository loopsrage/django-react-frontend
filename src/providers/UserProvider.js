import React, { useState, useContext } from 'react'
import MyAccount from '../apps/MyAccount'
import { useApi } from '../hooks/useApi'
import GlobalContext from './GlobalProvider'
import MyAccountForm from '../components/Forms/MyAccountForm'

const  UserContext = React.createContext({})
const endpoint = 'identities/'

export function UserProvider({children}){
    const [user, setUser] = useState({is_admin: null})
    const [myAccountFormState, setMyAccountFormState] = useState({})
    
    const {
        isUserLoggedIn
    } = useContext(GlobalContext)

    const handleUserUpdate = (result) => {
        setMyAccountFormState(result)
        setUser(result)
    }

    useApi('get', endpoint + 'get_current_user/', handleUserUpdate, null, [isUserLoggedIn])

    const navContext = {
        pageTabs: [
            {
                label: 'My Account',
                name: 'myAccount',
                component: <MyAccountForm />
            },
            {
                label: 'My Classes',
                name: 'myClasses',
                component: <div></div>
            },
            {
                label: 'My Tests',
                name: 'myTest',
                component: <div></div>
            }
        ]
    }

    return(
        <UserContext.Provider value={{
            navContext,
            user,
            setMyAccountFormState,
            myAccountFormState
        }} >
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer
export default UserContext