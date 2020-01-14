import React, { useState } from 'react'
import api from '../api'
import BaseEditWidget from '../components/Widgets/BaseEditWidget';
import QuestionCategoryForm from '../components/Forms/QuestionCategoryForm';



const QuestionCategoryContext = React.createContext({})
const endpoint = 'question-category/'

const editWidgetFormInitial = {
    'id': '',
    'name': ''
  };

export function QuestionCategoryProvider({children}){
    //BaseEditWidget
    const [editWidgetFormState, setEditWidgetFormState] = useState(editWidgetFormInitial);
    const [editWidgetApiTable, setEditWidgetApiTable] = useState();


    const handleEditWidgetFormState = (e) => {
        setEditWidgetFormState({
          ...editWidgetFormState,
          [e.target.name]: e.target.value
        })
    }

    const handleEditWidgetApiTable = (e) => {
        // Where e is equal to api response
        setEditWidgetApiTable(e)
    }

    const handleEditWidgetEndTime = (date) => {
        setEditWidgetFormState({
            ...editWidgetFormState,
            end_date: date
        })
      }
      const handleEditWidgetStartTime = (date) => {
        setEditWidgetFormState({
          ...editWidgetFormState,
          start_date: date
        })
    }

    const handleEditWidgetFormDelete = async () => {
        const url = endpoint + editWidgetFormState.id + '/';
        await api.delete(url)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleEditFormApiCall = async (id) => {
        const url = endpoint + id + '/';
        await api.get(url)
            .then(result => {
                setEditWidgetFormState(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleEditWidgetObjectClick = async (id) => {
        handleEditFormApiCall(id)
    };

    const handleEditWidgetFormNew = () => {
        setEditWidgetFormState(editWidgetFormInitial)
    }

    const handleEditWidgetFormUpdate = async () => {
        const url = endpoint
        if (editWidgetFormState.id === ""){
            await api.post(url, JSON.stringify(editWidgetFormState))
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            let editUrl = url + editWidgetFormState.id + '/';
            await api.patch(editUrl, JSON.stringify(editWidgetFormState))
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const EditWidgetContext = {
        editTabs: [
            {
                label: 'Settings',
                name: 'settings',
                component: <QuestionCategoryForm />
            }
        ],
        TableHeaders: [
            {
                id: 'id',
                label: 'Category ID',
                minWidth: 170,
                align:'left'
            },
            {
                id: 'name',
                label: 'Name',
                minWidth: 170,
                align:'center'
            }
        ]
    }
    const navContext = {
        pageTabs: [
            {
                label: 'Category Edit',
                name: 'catEdit',
                component: <BaseEditWidget endpoint={endpoint} context={QuestionCategoryContext} />
            }
        ]
    }
    

    return(
        <QuestionCategoryContext.Provider value={{ 
                // Required
                endpoint,
                navContext,
                // Callbacks
                handleEditWidgetApiTable,
                handleEditWidgetFormNew,
                handleEditWidgetFormDelete,
                handleEditWidgetObjectClick,
                handleEditWidgetFormState,
                handleEditWidgetEndTime,
                handleEditWidgetStartTime,
                handleEditWidgetFormUpdate,
                // Additional
                EditWidgetContext,
                editWidgetApiTable,
                editWidgetFormInitial,
                editWidgetFormState,
                
             }}>
            {children}
        </QuestionCategoryContext.Provider>
    )

}




export const QuestionCategoryConsumer = QuestionCategoryContext.Consumer
export default QuestionCategoryContext