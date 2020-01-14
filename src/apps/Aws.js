import React, {useContext} from 'react';
import BaseApp from './BaseApp';
import AwsContext from '../providers/AwsProvider';

export default function Aws(){
    const { navContext } = useContext(AwsContext);
    return (
        <div>
            <BaseApp pageTabs={navContext.pageTabs} />
        </div>
    )
}