  import React, { useContext, useState, useEffect, useMemo } from 'react';
  import ClassContext from '../../providers/ClassProvider';
  import TextInput from '../InputElements/TextInput';
  import BaseForm from './BaseForm';
  import DateField from '../InputElements/DateField';
  import ComboBoxField from '../InputElements/ComboBoxField';
  import { Switch, FormControlLabel, FormGroup } from '@material-ui/core';
import { useApi } from '../../hooks/useApi';
import api from '../../api';
import GlobalContext from '../../providers/GlobalProvider';

  

  export default function ClassForm() {

    const [classServers, setClassServers] = useState([])
    const [classInstructors, setClassInstructors] = useState([])
    const [classAttendees, setClassAttendees] = useState([])


    const {
      setEditWidgetFormState,
      editWidgetFormState,
      objectId,
      endpoint
    } = useContext(ClassContext)

    const {
      allInstructors,
      allAttendees,
    } = useContext(GlobalContext)

    useApi('get', endpoint + objectId + '/get_class_servers/', setClassServers, null, [objectId])
    useApi('get', endpoint + objectId + "/get_class_instructors/", setClassInstructors, null, [objectId] )
    useApi('get', endpoint + objectId + "/get_class_attendees/", setClassAttendees, null, [objectId] )

    const handleEnrollmentEnabledSwitch = (e) => {
      setEditWidgetFormState({
          ...editWidgetFormState,
          enrollment_enabled: !editWidgetFormState.enrollment_enabled,
      })
    }

    const handleEditWidgetEndDate = (date) => {
      setEditWidgetFormState({
          ...editWidgetFormState,
          end_date: date
      })
    }
    const handleEditWidgetStartDate = (date) => {
      setEditWidgetFormState({
        ...editWidgetFormState,
        start_date: date
      })
    }

    const handleEditWidgetFormState = (e) => {
      setEditWidgetFormState({
        ...editWidgetFormState,
        [e.target.name]: e.target.value
      })
    }

    const handleInstructorField = (e, newValue) => {
      let instructorUrls = []

      newValue.map(value => {
        let splitValue = value.split(":")
        let userUrl = 'http://localhost:533/api/v1/identities/' + splitValue[0] + "/"
        instructorUrls.push(userUrl)
      })

      setEditWidgetFormState({
        ...editWidgetFormState,
        instructors: instructorUrls
      })
    }

    const handleAttendeeField = (e, newValue) => {
      let attendeeUrls = []

      newValue.map(value => {
        let splitValue = value.split(":")
        let userUrl = 'http://localhost:533/api/v1/identities/' + splitValue[0] + "/"
        attendeeUrls.push(userUrl)
      })

      setEditWidgetFormState({
        ...editWidgetFormState,
        attendees: attendeeUrls
      })
    }

    return (
      <BaseForm context={ClassContext}>
        <DateField 
          label={'Start Date'}
          name='start_date'
          placeholder={'Start Date'}
          onChange={handleEditWidgetStartDate}
          value={editWidgetFormState.start_date}
          helperText={'The date the class is scheduled to begin.'}
          />
        <DateField 
          label={'End Date'}
          name='end_date'
          placeholder={'End Date'}
          onChange={handleEditWidgetEndDate}
          value={editWidgetFormState.end_date}
          helperText={'The day the class is scheduled to end.'}
          />
        <FormGroup style={{ margin: 8 }}>
          <FormControlLabel
            control={<Switch checked={editWidgetFormState.enrollment_enabled} onChange={handleEnrollmentEnabledSwitch} />}
            label={'Enrollment Enabled'}
          />
        </FormGroup>
        <ComboBoxField
          label='Instructors'
          options={
            allInstructors.map((item) => {
              return {
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                }
            })
          }
          name='instructors'
          value={classInstructors}
          callback={handleInstructorField}
        />
        <ComboBoxField
          label='Attendees'
          name='attendees'
          options={
            allAttendees.map((item) => {
              return {
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                }
            })
          }
          value={editWidgetFormState.attendees}
          callback={handleAttendeeField}
        />
        <TextInput 
          label={'Class ID'}
          name='id'
          placeholder={"Class ID"}
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
          label={'Old Class ID'}
          name='old_class_id'
          placeholder={'Old Class Id'}
          onChange={handleEditWidgetFormState}
          helperText={'Class Id as it relates to the previous training site'}
          value={editWidgetFormState.old_class_id}
          />
        <TextInput 
          label={'Description'} 
          name='description'
          placeholder={'Description'}
          helperText={'The description of the class. What the end user will see when signing up'}
          onChange={handleEditWidgetFormState}
          value={editWidgetFormState.description}
          />
        <TextInput 
          label={'Notes'} 
          name='notes'
          placeholder={'Notes'}
          helperText={'Internal notes for the instructors use.'}
          onChange={handleEditWidgetFormState}
          value={editWidgetFormState.notes}
          />
        <TextInput 
          label={'Max Seats'} 
          name='max_seats'
          placeholder={'Max Seats'}
          helperText={'The estimated capacity for the class.'}
          onChange={handleEditWidgetFormState}
          value={editWidgetFormState.max_seats}
          />
        <TextInput 
          label={'Location'}
          name='location'
          placeholder={'Location'}
          helperText={'The physical location of the class. Alternatively, the meeting url if the class is online.'}
          onChange={handleEditWidgetFormState}
          value={editWidgetFormState.location}
          />
      </BaseForm>
    );
  }