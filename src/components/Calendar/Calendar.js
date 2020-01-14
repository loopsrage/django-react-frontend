import React, { useEffect, useState, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './main.scss' // webpack must be configured to do this
import api from '../../api'
import { Grid } from '@material-ui/core'
import GlobalContext from '../../providers/GlobalProvider'

export default function Calendar(){
    const [events, setEvents] = useState()
    const {viewState} = useContext(GlobalContext)
    useEffect(() => {
      const get_events = async () => {
          const url = 'classes/get_class_dates/'
          await api.get(url)
            .then(result => {
              setEvents(result.data)
            })
            .catch(error => {
              console.log(error)
            })
      }
      get_events()
    },[])
    return (
      <Grid {...viewState} justify='center'>
        <FullCalendar 
          defaultView="dayGridMonth"
          plugins={[ dayGridPlugin ]} 
          events={events}
          />
      </Grid>
    )
}