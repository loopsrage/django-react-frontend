import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import api from '../../api';

export default function BaseForm({context, children}) {

  const { 
    objectId,
    setEditWidgetFormState,
    editWidgetFormState,
    editWidgetFormInitial,
    handleObjectIdUpdate,
    endpoint,
  } = useContext(context)

  const handleDeleteApi = async () => {
    if(!objectId){
      return
    }
    await api.delete(endpoint + objectId + '/')
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handlePostApi = async () => {
    await api.post(endpoint, JSON.stringify(editWidgetFormState))
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handlePatchApi = async () => {
    await api.patch(endpoint + objectId + '/', JSON.stringify(editWidgetFormState))
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleNewButton = () => {
    handleObjectIdUpdate(null)
    setEditWidgetFormState(editWidgetFormInitial)
  }

  return (
    <Box width="100%">
        <ButtonGroup color='default' variant='contained'  >
            <Button onClick={handleNewButton}>New</Button>
            {
              (objectId)
              ? ( 
                  [
                    <Button onClick={handlePatchApi}>Update</Button>,
                    <Button onClick={handleDeleteApi}>Delete</Button>
                  ]
                )
              : <Button onClick={handlePostApi}>Save</Button>
            }
        </ButtonGroup>
      <Box>
        {children}
      </Box>
    </Box>
  );
}