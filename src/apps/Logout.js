import React, { useEffect, useContext } from 'react';
import Cookies from 'js-cookie'
import GlobalContext from '../providers/GlobalProvider';
import { Redirect } from 'react-router-dom';

export default function Logout(){
    
    const { logoutProcedure } = useContext(GlobalContext)

    useEffect(() => {
        Cookies.remove('csrf')
        Cookies.remove('apv1')
        logoutProcedure()
    }, [])

    return (
        <div>
            <Redirect to='/classes'></Redirect>
        </div>
    )
}