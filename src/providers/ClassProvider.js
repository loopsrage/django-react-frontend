import React, { useState, useCallback, useEffect } from 'react'
import BaseEditWidget from '../components/Widgets/BaseEditWidget';
import CalendarWidget from '../components/Widgets/CalendarWidget';
import ClassForm from '../components/Forms/ClassForm';
import CheckboxList from '../components/Widgets/BaseListWidget'
import { Button, ButtonGroup } from '@material-ui/core';
import { useApi } from '../hooks/useApi';

const ClassContext = React.createContext({})
const endpoint = 'classes/'

const editWidgetFormInitial = {
    "id": '',
    "name": '',
    "old_class_id": '',
    "description": '',
    "notes": '',
    "start_date": '',
    "end_date": '',
    "max_seats": '',
    "location": '',
    "instructors": [],
    'attendees': [],
    'enrollment_enabled': false
}


export function ClassProvider({children}){

    // BaseEditWidget
    const [objectId, setObjectId] = useState(null);

    const [editWidgetFormState, setEditWidgetFormState] = useState(editWidgetFormInitial);
    // Class related data
    useApi('get', endpoint + objectId, setEditWidgetFormState, null, [objectId])



    const handleObjectIdUpdate = (id) => {
        setObjectId(id)
    }
    // Buttons to send to the list widget
    const serverButtons = [
        <Button>Start</Button>,
        <Button>Stop</Button>
    ]

    // Tabs for the edit widget
    const EditWidgetContext = {
        editTabs: [
            {
                label: 'Settings',
                name: 'settings',
                component: <ClassForm />
            },
            {
                label: 'Servers',
                name: 'servers',
                component: <CheckboxList context={ClassContext} button_actions={serverButtons} />
            },
            {
                label: 'Tests',
                name: 'tests',
                component: <div>Nothing yet</div>
            },
        ],
        // Headers for the stickyheadertable
        TableHeaders: [
            {
                id: 'id',
                label: 'Class ID',
                minWidth: 170,
                align:'left'
            },
            {
                id: 'name',
                label: 'Name',
                minWidth: 170,
                align:'center'
            },
            {
                id: 'start_date',
                label: 'Start Date',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'end_date',
                label: 'End Date',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'location',
                label: 'Location',
                minWidth: 170,
                align: 'center'
            }
        ]
    }

    // App specific tabs
    const navContext = {
        pageTabs: [
            {
                label: 'Class Edit',
                name: 'classEdit',
                component: <BaseEditWidget context={ClassContext} />
            },
            {
                label: 'Calendar',
                name: 'calendar',
                component: <CalendarWidget />
            },
        ]
    }
    // We return the provider with all data API's collect
    // In addition to this we pass our state callbacks
    // And any switches specific to this app
    return(
        <ClassContext.Provider value={{ 
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
        </ClassContext.Provider>
    )
}
export const ClassConsumer = ClassContext.Consumer
export default ClassContext