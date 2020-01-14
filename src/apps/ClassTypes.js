import React, {useContext} from 'react';
import BaseApp from './BaseApp';
import ClassTypeContext from '../providers/ClassTypeProvider';

export default function ClassTypes(){
    const { navContext } = useContext(ClassTypeContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} context={ClassTypeContext} />
        </div>
    )
}