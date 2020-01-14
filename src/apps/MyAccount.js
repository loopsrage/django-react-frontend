import React, {useContext} from 'react';
import BaseApp from './BaseApp';
import UserContext from '../providers/UserProvider';

export default function MyAccount(){
    const { navContext } = useContext(UserContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} context={UserContext} />
        </div>
    )
}