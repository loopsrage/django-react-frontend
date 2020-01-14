import React, { useContext } from 'react'
import TextInput from '../InputElements/TextInput'
import { Box } from '@material-ui/core'
import GlobalContext from '../../providers/GlobalProvider';

export default function LoginForm(){
    const {Username, Password, handleUsername, handlePassword} = useContext(GlobalContext)

    return(
      <Box>
        <TextInput
            label="Username"
            placeholder="Username"
            helperText="Training site username."
            onChange={handleUsername}
            value={Username}
        />
        <TextInput
            label="Password"
            placeholder="Password"
            helperText="Training site password."
            type="password"
            onChange={handlePassword}
            value={Password}
        />
      </Box>
    );
}