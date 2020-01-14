import React, { useState } from 'react'
import BaseEditWidget from '../components/Widgets/BaseEditWidget';
import AmiForm from '../components/Forms/AmiForm'
import { Button } from '@material-ui/core';
import CheckboxList from '../components/Widgets/BaseListWidget';
import { useApi } from '../hooks/useApi';

const AwsContext = React.createContext({})
const endpoint = 'ami/'
const editWidgetFormInitial =  {
    "id": '',
    "name": "",
    "amid": "",
    "description": "",
    "instance_type": ''
}

export function AwsProvider({children}){
    // BaseEditWidget
    const [objectId, setObjectId] = useState(null);
    const [editWidgetFormState, setEditWidgetFormState] = useState(editWidgetFormInitial);
    useApi('get', endpoint + objectId, setEditWidgetFormState, null, [objectId])
    
    const handleObjectIdUpdate = (id) => {
        setObjectId(id)
    }

    const EditWidgetContext = {
        editTabs: [
            {
                label: 'Settings',
                name: 'settings',
                component: <AmiForm />
            }
        ],
        TableHeaders: [
            {
                id: 'id',
                label: 'Class Type ID',
                minWidth: 170,
                align:'left'
            },
            {
                id: 'name',
                label: 'Name',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'amid',
                label: 'Amid',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'instance_type',
                label: 'Instance Type',
                minWidth: 170,
                align: 'right'
            }
        ]
    }

    const serverButtons = [
        <Button>Start</Button>,
        <Button>Stop</Button>
    ]
    
    const navContext = {
        pageTabs: [
            {
                label: 'Ami Edit',
                name: 'amiEdit',
                component: <BaseEditWidget context={AwsContext} />
            },
            {
                label: 'Server List',
                name: 'serverList',
                component: <CheckboxList context={AwsContext} button_actions={serverButtons} />
            }
        ]
    }
    return(
        <AwsContext.Provider value={{ 
            endpoint,
            EditWidgetContext,
            navContext,
            editWidgetFormState,
            setEditWidgetFormState,
            objectId,
            handleObjectIdUpdate,
            editWidgetFormInitial
             }}>
            {children}
        </AwsContext.Provider>
    )
}
export const AwsConsumer = AwsContext.Consumer
export default AwsContext