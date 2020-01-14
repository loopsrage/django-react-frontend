import React, { useContext } from 'react';
import TextInput from '../InputElements/TextInput';
import BaseForm from './BaseForm';
import QuestionCategoryContext from '../../providers/QuestionCategoryProvider';

export default function QuestionCategoryForm() {

  const { 
    handleEditWidgetFormState,
    editWidgetFormState,
    navContext
  } = useContext(QuestionCategoryContext);

  return (
    <BaseForm pageTabs={navContext.pageTabs} context={QuestionCategoryContext}>
      <TextInput 
        label={'Category Id'}
        name='id'
        placeholder={"Category Id"}
        helperText={'Training site specific Id.'}
        value={ editWidgetFormState.id }
        />
      <TextInput 
        label={'Name'}
        name='name'
        placeholder={'Category Name'}
        onChange={handleEditWidgetFormState}
        helperText={'Name of the category.'}
        value={editWidgetFormState.name}
        />
    </BaseForm>
  );
}