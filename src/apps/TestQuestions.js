import React, { useContext } from 'react';
import BaseApp from './BaseApp';
import TestContext from '../providers/TestsProvider';
import QuestionsContext from '../providers/QuestionsProvider';
import BaseForm from '../components/Forms/BaseForm';
import Asynchronous from '../components/InputElements/AsyncRequest';

export default function TestQuestions ({endpoint}){
    const { 
        handleEditWidgetFormState,
        editWidgetFormState,
      } = useContext(TestContext);
    
    return(
        <>
        
            <Asynchronous
                endpoint='tests/'
                name="name"
                label ={'Select a Test to View Questions'}
                placeholder={"Test"} 
                />
        </>
    )



}