import React, { useContext } from 'react';
import QuestionsContext from '../../providers/QuestionsProvider';
import ComboBoxField from '../InputElements/ComboBoxField';
import TextInput from '../InputElements/TextInput';
import BaseForm from './BaseForm';
import Checkboxes from '../InputElements/CheckBoxes';


export default function QuestionForm() {

  const { 
    handleEditWidgetFormState,
    editWidgetFormState,
  } = useContext(QuestionsContext);

  return (         
  <BaseForm context={QuestionsContext}>
    <TextInput 
        label={'Question'}
        name='question'
        placeholder={"Question"}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.question} 
      />
        
    <ComboBoxField
        label={'Category'}
        freeSolo={true}
        name='category'
        placeholder={"Category"}
        options={[{name: editWidgetFormState.category, value: 'category'}]}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.category} 
      />

      <div className='question_Answer'>
      <Checkboxes 
        endpoint={'answers/'}
        name="answers"
        label ={'Response One'} 
        helperText='Provide some answer text'
        callback={handleEditWidgetFormState}
        values={editWidgetFormState.answers}
      />
    
    <Checkboxes
        name="answer_text"
        label ={'Response Two'} 
        helperText='Provide some answer text'
        callback={handleEditWidgetFormState}
        value={editWidgetFormState.answers}
      />
  
    <Checkboxes
        name="answer_text"
        label ={'Response Three'} 
        helperText='Provide some answer text'
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.answers}
      />

    <Checkboxes
        name="answer_text"
        label ={'Response Four'} 
        helperText='Provide some answer text'
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.answers}
      />
      </div>   
        
  </BaseForm>
  );
}