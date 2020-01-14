import React, { useState } from 'react'
import api from '../api'

const AnswerContext = React.createContext({})

const endpoint = 'answers/'

const editWidgetFormInitial ={
    'id':'',
    'answer_text':'',
    'correct_answer':''
}

export function AnswerProvider({children}){
     // BaseEditWidget
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

   
    return(
        <AnswerContext.Provider value={{ 
                // Required
                endpoint,
                // Callbacks
                handleEditWidgetApiTable,
                handleEditWidgetFormNew,
                handleEditWidgetFormDelete,
                handleEditWidgetObjectClick,
                handleEditWidgetFormState,
                handleEditWidgetFormUpdate,
                // Additional
                editWidgetApiTable,
                editWidgetFormInitial,
                editWidgetFormState,
                
             }}>
            {children}
        </AnswerContext.Provider>
    )
}

export const AnswerConsumer = AnswerContext.Consumer
export default AnswerContext