import React, { useContext, useState } from 'react';
import TextInput from '../InputElements/TextInput';
import BaseForm from './BaseForm';
import ComboBoxField from '../InputElements/ComboBoxField';
import ClassTypeContext from '../../providers/ClassTypeProvider';

export default function ClassTypeForm() {

  const { 
    editWidgetFormState,
    setEditWidgetFormState 
  } = useContext(ClassTypeContext);

  const handleEditWidgetFormState = (e) => {
    setEditWidgetFormState({
      ...editWidgetFormState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <BaseForm context={ClassTypeContext} >
      <TextInput
        label='Id'
        name='id'
        placeholder='Class Type ID'
        helperText='Unique identifier for the class type'
        value={editWidgetFormState.id}
        />
      <TextInput 
        label={'Name'}
        name='name'
        placeholder={'Class Type Name'}
        helperText={'Friendly name or Title for a class type.'}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.name}
        />
        <ComboBoxField
          label='Test'
          helperText="The Test the users will take at the end of the class"
          options={[{name: 'VSA-FAKEDATA'}]}
        />
        <ComboBoxField
          label='Amis'
          helperText="The servers that will be started in AWS for this class"
          options={[{name: 'VSA-FAKEDATA'}]}
        />
    </BaseForm>
  );
}