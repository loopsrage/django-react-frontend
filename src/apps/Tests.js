import React, { useContext } from 'react';
import BaseApp from './BaseApp';
import TestContext from '../providers/TestsProvider';

export default function Tests(){
    const { navContext } = useContext(TestContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} context={TestContext}/>
        </div>
    )
}

    