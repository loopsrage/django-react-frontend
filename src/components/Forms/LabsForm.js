import React, { useContext } from 'react';
import TextInput from '../InputElements/TextInput';
import BaseForm from './BaseForm';
import LabsContext from '../../providers/LabsProvider';

export default function LabsForm() {
  const { 
    editWidgetFormState,
    setEditWidgetFormState 
  } = useContext(LabsContext)

  const handleEditWidgetFormState = (e) => {
    setEditWidgetFormState({
      ...editWidgetFormState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <BaseForm context={LabsContext}>
        <TextInput 
            label={'Lab ID'}
            name='id'
            placeholder={"Lab ID"}
            helperText={'Unique Identifier for a class.'}
            value={editWidgetFormState.id}
            />
        <TextInput 
            label={'Name'}
            name='name'
            placeholder={'Class Name'}
            helperText={'Friendly name or Title for a class.'}
            onChange={handleEditWidgetFormState}
            value={editWidgetFormState.name}
            />
        <TextInput 
            label={'Description'}
            name='description'
            placeholder={'Description'}
            helperText={'Describe the overall concept of the lab.'}
            onChange={handleEditWidgetFormState}
            value={editWidgetFormState.description}
            />
        <TextInput 
            label={'Category'}
            name='category'
            placeholder={'Lab Category'}
            helperText={'The Category this lab belongs to.'}
            onChange={handleEditWidgetFormState}
            value={editWidgetFormState.category}
            />
        <TextInput 
            label={'Lab Steps'}
            name='lab_steps'
            placeholder={'Lab Steps'}
            helperText={'Steps needed to complete the labs.'}
            onChange={handleEditWidgetFormState}
            value={editWidgetFormState.lab_steps}
            />
    </BaseForm>
  );
}