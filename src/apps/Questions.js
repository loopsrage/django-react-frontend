import React, { useContext } from 'react';
import BaseApp from './BaseApp';
import QuestionsContext from '../providers/QuestionsProvider';

export default function Questions(){
    const { navContext } = useContext(QuestionsContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} context={QuestionsContext}/>
        </div>
    )
}