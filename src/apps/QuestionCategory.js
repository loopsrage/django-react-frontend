import React, {useContext} from 'react';
import BaseApp from './BaseApp';
import QuestionCategoryContext from '../providers/QuestionCategoryProvider';

export default function QuestionCategory(){
    const { navContext } = useContext(QuestionCategoryContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} context={QuestionCategoryContext} />
        </div>
    )
}