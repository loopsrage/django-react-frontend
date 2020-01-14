import React, { useContext } from 'react';
import TabsList from '../components/Layout/TabsList';
import GlobalContext from '../providers/GlobalProvider';


export default function BaseApp({pageTabs}){
    const {csrftoken, handleCsrfToken, userIsLoggedIn} = useContext(GlobalContext)

	if(!csrftoken){
		handleCsrfToken()
    }

    return(
        <TabsList pageTabs={pageTabs} />
    );
}