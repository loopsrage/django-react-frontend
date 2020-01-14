import React, { useState } from 'react'
import api from '../api'
import BaseEditWidget from '../components/Widgets/BaseEditWidget';
import TestForm from '../components/Forms/TestForm';
import QuestionForm from '../components/Forms/QuestionForm';
import QuestionsContext from './QuestionsProvider';
import TestQuestions from '../apps/TestQuestions';


const TestsContext = React.createContext({})
const endpoint = 'tests/'
const questionEndpoint='question/'

const editWidgetFormInitial = {
    'id': '',
    'name': '',
    'author': '',
    'question_count': '',
    'reqScore': '',
    'timer': '',
    'daysAvailable': '',
    'description': '',
    'select_random':'', 
    'cert':''
  };

export function TestsProvider({children}){
    //BaseEditWidget
    const [editWidgetFormState, setEditWidgetFormState] = useState(editWidgetFormInitial);
    const [editWidgetApiTable, setEditWidgetApiTable] = useState();
    const [randomState, setRandomState] = useState(true)

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

    const handleSelectRandomSwitch = (e) => {
        setRandomState(!randomState)
    }

    const EditWidgetContext = {
        editTabs: [
            {
                label: 'Settings',
                name: 'settings',
                component: <TestForm />
            },
            {
                label: 'Add Question',
                name: 'questions',
                component: <QuestionForm />
            }
        ],
        TableHeaders: [
            {
                id: 'id',
                label: 'Test ID',
                minWidth: 170,
                align:'left'
            },
            {
                id: 'name',
                label: 'Title',
                minWidth: 170,
                align:'center'
            },
            {
                id: 'question_count',
                label: 'Question Count',
                minWidth: 170,
                align: 'center'
            },
            {
                id: 'description',
                label: 'Required Score',
                minWidth: 170,
                align: 'center'
            }
        ]
    }
    const navContext = {
        pageTabs: [
            {
                label: 'Test Edit',
                name: 'testEdit',
                component: <BaseEditWidget endpoint={endpoint} context={TestsContext} />
            },
            {
                label: 'Test Questions',
                name: 'testQuestions',              
                component:  <> <> <TestQuestions endpoint={endpoint}/> </> <><BaseEditWidget endpoint={questionEndpoint} context={QuestionsContext}/> </> </>
            }
        ]
    }
    

    return(
        <TestsContext.Provider value={{ 
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
                handleSelectRandomSwitch,
                // Additional
                EditWidgetContext,
                editWidgetApiTable,
                editWidgetFormInitial,
                editWidgetFormState,
                
             }}>
            {children}
        </TestsContext.Provider>
    )

}




export const TestsConsumer = TestsContext.Consumer
export default TestsContext