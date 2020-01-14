import React, { useState } from 'react'
import BaseEditWidget from '../components/Widgets/BaseEditWidget';
import LabsForm from '../components/Forms/LabsForm'
import { useApi } from '../hooks/useApi';

const LabsContext = React.createContext({})
const endpoint = 'labs/'
const editWidgetFormInitial =  {
    "id": "",
    "name": "",
    "description": "",
    "category": "",
    "lab_steps": ""
}

export function LabsProvider({children}){
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
                component: <LabsForm />
            }
        ],
        TableHeaders: [
            {
                id: 'id',
                label: 'Lab Id',
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
                id: 'description',
                label: 'Description',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'category',
                label: 'Category',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'lab_steps',
                label: 'Lab Steps',
                minWidth: 170,
                align: 'right'
            }
        ]
    }
    const navContext = {
        pageTabs: [
            {
                label: 'Lab Edit',
                name: 'labEdit',
                component: <BaseEditWidget context={LabsContext} />
            }
        ]
    }

    return(
        <LabsContext.Provider value={{
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
        </LabsContext.Provider>
    )
}
export const LabsConsumer = LabsContext.Consumer
export default LabsContext