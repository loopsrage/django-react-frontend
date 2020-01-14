import React, { useContext } from 'react';
import BaseApp from './BaseApp';
import ClassContext from '../providers/ClassProvider';

export default function Classes(){
    const { navContext } = useContext(ClassContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} />
        </div>
    )
}