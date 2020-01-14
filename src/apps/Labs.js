import React, {useContext} from 'react';
import BaseApp from './BaseApp';
import LabsContext from '../providers/LabsProvider';

export default function Labs(){
    const { navContext } = useContext(LabsContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} context={LabsContext} />
        </div>
    )
}