import React, { useState, useEffect } from 'react'
import api from '../api'
import BaseEditWidget from '../components/Widgets/BaseEditWidget';
import ClassTypeForm from '../components/Forms/ClassTypeForm'
import { useApi } from '../hooks/useApi';

const ClassTypeContext = React.createContext({})

const editWidgetFormInitial = {
    'id': '',
    'name': '',
    'ami': []
}

const endpoint = 'classtypes/'

export function ClassTypeProvider({children}){
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
                component: <ClassTypeForm />
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
                id: 'Ami',
                label: 'Amid',
                minWidth: 170,
                align: 'center'
            }
        ]
    }
    const navContext = {
        pageTabs: [
            {
                label: 'Class Type Edit',
                name: 'classTypeEdit',
                component: <BaseEditWidget  context={ClassTypeContext} />
            }
        ]
    }
    //#endregion
    return(
        <ClassTypeContext.Provider value={{ 
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
        </ClassTypeContext.Provider>
    )
}
export const ClassTypeConsumer = ClassTypeContext.Consumer
export default ClassTypeContext