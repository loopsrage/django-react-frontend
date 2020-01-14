import React, { useState } from 'react'
import api from '../api'
import BaseEditWidget from '../components/Widgets/BaseEditWidget';
import QuestionForm from '../components/Forms/QuestionForm';
import TestsContext from '../providers/TestsProvider';
import QuestionCategoryContext from '../providers/QuestionCategoryProvider';
import QuestionCategoryForm from '../components/Forms/QuestionCategoryForm'


const QuestionsContext = React.createContext({})

const endpoint = 'question/'
const catEndpoint = 'question-category/'

const editWidgetFormInitial={
    'id': '',
    'name': '',
    'question': '',
    'answers':[]
  };


export function QuestionsProvider({children}){
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
        let answers = []
        let results = null
        await api.get(url)
            .then(result => {
                results = result.data
                results.answers.map(async answer => {
                    if(answer.startsWith('http')){
                        await api.get(answer)
                            .then(result1 => {
                                answers.push(result1.data.answer_text)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })

        if(results !== null){
            results.answers = answers[0]
            console.log(results.answers)
            setEditWidgetFormState(results);
        }
        
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
                name: 'questions',
                component: <QuestionForm />
            },
            {
                label: 'Categories',
                name: 'questions',
                component: <QuestionCategoryForm />
            }
        ],
        TableHeaders: [
            {
                id: 'id',
                label: 'Question ID',
                minWidth: 170,
                align:'left'
            },
            {
                id: 'name',
                label: 'Question',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'answers',
                label: 'Category',
                minWidth: 170,
                align: 'center'
            }
        ]
    }
    const navContext = {
        pageTabs: [
            {
                label: 'Question Edit',
                name: 'questionEdit',
                component: <BaseEditWidget endpoint={endpoint} context={QuestionsContext} />
            },
            {
                label: 'Questn Categories',
                name: 'QuestionCategoryEdit',
                component: <BaseEditWidget endpoint={catEndpoint} context={QuestionsContext}/>
            }
        ]
    }

    return(
        <QuestionsContext.Provider value={{ 
                // Required
                endpoint,
                navContext,
                // Callbacks
                handleEditWidgetApiTable,
                handleEditWidgetFormNew,
                handleEditWidgetFormDelete,
                handleEditWidgetObjectClick,
                handleEditWidgetFormState,
                handleEditWidgetFormUpdate,
                // Additional
                EditWidgetContext,
                editWidgetApiTable,
                editWidgetFormInitial,
                editWidgetFormState,
                
             }}>
            {children}
        </QuestionsContext.Provider>
    )
}

export const QuestionsConsumer = QuestionsContext.Consumer
export default QuestionsContext
