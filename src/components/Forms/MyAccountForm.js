import React, { useContext } from 'react'
import TextInput from '../InputElements/TextInput'
import { Box, Checkbox, Typography, Switch } from '@material-ui/core'
import GlobalContext from '../../providers/GlobalProvider';
import UserContext from '../../providers/UserProvider';

export default function MyAccountForm(){
    const {
        user,
        setMyAccountFormState,
        myAccountFormState
    } = useContext(UserContext)

    const handleUserSettingsForm = (e) => {
        setMyAccountFormState({
            ...myAccountFormState,
            [e.target.name]: e.target.value
        })
    }

    if(!user){
        user = {}
    }
    return (
        <Box>
            <TextInput 
                name="first_name"
                label="First Name"
                helperText="Your first name"
                value={myAccountFormState.first_name}
                onChange={handleUserSettingsForm}
            />
            <TextInput 
                name="last_name"
                label="Last Name"
                helperText="Your last name"
                value={myAccountFormState.last_name}
                onChange={handleUserSettingsForm}
            />
            <Switch
                name='is_admin'
                checked={myAccountFormState.is_admin}
                onChange={handleUserSettingsForm}
            />
            <Checkbox
                name='is_analist'
                checked={myAccountFormState.is_analist}
                onChange={handleUserSettingsForm}
            />
            <TextInput 
                name='is_ftp_enabled'
                label='Ftp Enabled'
                value={myAccountFormState.is_ftp_enabled}
            />
        </Box>
    );
}