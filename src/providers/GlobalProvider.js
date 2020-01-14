import React, {useState, useMemo} from 'react'
import Cookies from 'js-cookie'
import api from '../api';

const  GlobalContext = React.createContext({})

const API_HOST = 'http://localhost:533/';

const endpoint = API_HOST + 'api/v1/auth/'

const grid_large = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
};

const grid = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 6,
    xl: 6,
};

export function GlobalProvider({children}){
    const [csrftoken, setCsrfToken] = useState('')
    const [token, setToken] = useState('');
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

    const [viewToggle, setViewToggle] = useState(true)
    const [viewState, setViewState] = useState(grid_large)

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [loginOpen, setLoginOpen] = useState(false);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loginError, setLoginError] = useState(null)

    const [apiReady, setApiReady] = useState(false)

    const [allInstructors, setAllInstructors] = useState([])
    const [allAttendees, setAllAttendees] = useState([])

    const handleInstructorSearch = async () => {
        await api.get('identities/get_possible_instructors/')
          .then(result => {
            setAllInstructors(result.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
      const handleAttendeeSearch = async () => {
        await api.get('identities/get_possible_attendees/')
          .then(result => {
            setAllAttendees(result.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
  
      useMemo(() => {
        handleAttendeeSearch()
        handleInstructorSearch()
      }, [])

    const handleToken = (t) => {
        setToken(t.data.token)
        Cookies.set('apv1', t.data.token, { expires: 7 })
    }

    const toggleDrawerCallback = event => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLoginDialog = event => {
        setLoginOpen(!loginOpen);
    }

    const handleCsrfToken = async () => {
        const response = await fetch(`${API_HOST}csrf/`, {
            credentials: 'include'
        });
        const data = await response.json();
        Cookies.set('csrftoken', data['csrftoken'], {expires: 1})
        setCsrfToken(data['csrftoken'])
    };

    const handleUsername = (e) => {
        setUsername(
            e.target.value
          )
      }
    
    const handlePassword = (e) => {
          setPassword(
              e.target.value
          )
    }
      
    const handleViewStateToggle = () => {
        if(viewToggle){
            setViewState(grid)
            setViewToggle(false)
        } else {
            setViewState(grid_large)
            setViewToggle(true)
        }
    }

    const logoutProcedure = () => {
        Cookies.remove('apv1')
        Cookies.remove('csrftoken')
        setUserIsLoggedIn(false)
        setToken('')
        setCsrfToken('')
    }

    const handleLogin = async () => {
        await api.post(endpoint, JSON.stringify({username, password}))
            .then(result => {
                handleToken(result)
                setLoginOpen(false)
                setUsername("")
                setPassword("")
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error)
                setPassword("")
                setLoginError(error)
            })
    };

    if(!token){
        let existingToken = Cookies.get('apv1')
        if(existingToken !== undefined){
            setToken(existingToken)
            setUserIsLoggedIn(true)
        }
    }

    return (
        <GlobalContext.Provider value={{ 
            handleCsrfToken,
            csrftoken,
            handleToken,
            token,
            userIsLoggedIn,
            handleViewStateToggle,
            viewState,
            logoutProcedure,
            drawerOpen,
            loginOpen,
            toggleDrawerCallback,
            handleLoginDialog,
            handleLogin,
            handlePassword,
            handleUsername,
            loginError,
            apiReady,
            setApiReady,
            allInstructors,
            allAttendees
         }}>
            {children}
        </GlobalContext.Provider>
    )
}
export const  GlobalConsumer = GlobalContext.Consumer
export default GlobalContext
