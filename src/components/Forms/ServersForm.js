import React, { useContext, useState, useEffect } from 'react';
import ClassContext from '../../providers/ClassProvider';
import TextInput from '../InputElements/TextInput';
import BaseForm from './BaseForm';
import DateField from '../InputElements/DateField';
import ComboBoxField from '../InputElements/ComboBoxField';
import api from '../../api';
import { Box, ButtonGroup, Button } from '@material-ui/core';

export default function ServersForm(){
    const {
        handleStartServers,
        handleStopServers
    } = useContext(ClassContext);
    return (
        <Box width="100%">
            <ButtonGroup color='default' variant='contained'  >
                <Button onClick={handleStartServers}>Start Servers</Button>
                <Button onClick={handleStopServers}>Stop Server</Button>
            </ButtonGroup>
        </Box>
    )
}