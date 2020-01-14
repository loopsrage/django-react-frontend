import React, { useContext } from 'react';
import TextInput from '../InputElements/TextInput';
import BaseForm from './BaseForm';
import AwsContext from '../../providers/AwsProvider';

export default function AmiForm() {

  const { 
    editWidgetFormState,
    setEditWidgetFormState 
  } = useContext(AwsContext);

  const handleEditWidgetFormState = (e) => {
    setEditWidgetFormState({
      ...editWidgetFormState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <BaseForm context={AwsContext}>
      <TextInput 
        label={'Ami Id'}
        name='id'
        placeholder={"Ami Id"}
        helperText={'Training site specific Id.'}
        value={ editWidgetFormState.id }
        />
      <TextInput 
        label={'Name'}
        name='name'
        placeholder={'Ami Name'}
        onChange={handleEditWidgetFormState}
        helperText={'Friendly name for the AMI.'}
        value={editWidgetFormState.name}
        />
      <TextInput 
        label={'Amid'}
        name='amid'
        placeholder={'Amid'}
        onChange={handleEditWidgetFormState}
        helperText={'The AMID pulled from AWS. Identifies a server image.'}
        value={editWidgetFormState.amid}
        />
      <TextInput 
        label={'Description'}
        name='description'
        placeholder={'Description'}
        onChange={handleEditWidgetFormState}
        helperText={'Describes the server. Include installed services and intention of the server.'}
        value={editWidgetFormState.description}
        />
      <TextInput 
        label={'Instance Type'}
        name='instance_type'
        placeholder={'Instance Type'}
        onChange={handleEditWidgetFormState}
        helperText={'Determines what type of server to launch. See: https://aws.amazon.com/ec2/instance-types/'}
        value={editWidgetFormState.instance_type}
        />
    </BaseForm>
  );
}