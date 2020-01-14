import React, { useContext} from 'react';
import TestContext from '../../providers/TestsProvider';
import TextInput from '../InputElements/TextInput';
import BaseForm from './BaseForm';
import ComboBoxField from '../InputElements/ComboBoxField';
import { Switch, FormControlLabel, FormGroup } from '@material-ui/core';


export default function TestForm() {
  const { 
    handleEditWidgetFormState,
    editWidgetFormState,
    handleSelectRandomSwitch,
    selectRandom
  } = useContext(TestContext);

  return (
 <BaseForm context={TestContext}>
      <TextInput 
        label={'Title'}
        name='name'
        placeholder={'Test Title'}
        helperText={'Friendly name or Title for a test.'}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.title}
        />

      <TextInput 
        label={'Author'}
        name='author'
        placeholder={'Author'}
        onChange={handleEditWidgetFormState}
        helperText={'Author of test'}
        value={editWidgetFormState.author}
        />

      <TextInput 
        label={'Question Count'} 
        name='question_count'
        placeholder={'Question Count'}
        helperText={'The number of questions randomly selected from the bank'}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.questionCount}      
        />

      <TextInput 
        label={'Required Score'} 
        name='required_score'
        placeholder={'Required Score'}
        helperText={'The required score to pass the class'}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.reqScore}
        />

       <TextInput 
        label={'Timer'}
        name='timer'
        placeholder={'Timer'}
        helperText={'How long the test can be open for'}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.timer}
        />

         <TextInput 
        label={'Days available to take test'}
        name='days_available'
        placeholder={'Days Available'}
        helperText={'How long the test will be available for'}
        onChange={handleEditWidgetFormState}
        value={editWidgetFormState.daysAvailable}
        />

        <ComboBoxField
          label='Question Categories to Include in Test bank'
          options={[{name: 'Question Categories'}]}
        />

        <ComboBoxField
          label='Certification'
          options={[{name: 'Certificates go Here'}]}
        />

        <FormGroup style={{ margin: 8 }}>
          <FormControlLabel
            control={<Switch checked={selectRandom} onChange={handleSelectRandomSwitch} />}
            label={'Select Random'}
            value={editWidgetFormState.select_random}
          />
        </FormGroup>

    </BaseForm>
  );
}