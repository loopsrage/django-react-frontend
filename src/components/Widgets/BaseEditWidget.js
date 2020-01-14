import React, {useContext, useEffect, useState} from 'react';
import StickyHeadTable from '../Layout/StickyHeadTable';
import TabsList from '../Layout/TabsList';
import Grid from '@material-ui/core/Grid';
import PaperLayout from '../Layout/PaperLayout';
import GlobalContext from '../../providers/GlobalProvider';
import { useApi } from '../../hooks/useApi';


const EditWidgetTablePane = ({context}) => {
    const { 
        endpoint,
        EditWidgetContext,
        handleObjectIdUpdate
    } = useContext(context)
    
    const { viewState } = useContext(GlobalContext)
    const [editWidgetApiTable, setEditWidgetApiTable] = useState([]);
    useApi('get', endpoint, setEditWidgetApiTable)

    return(
        <Grid item {...viewState }>
            <PaperLayout>
                <StickyHeadTable
                    headers={EditWidgetContext.TableHeaders}
                    rows={editWidgetApiTable}
                    objectClickCallback={handleObjectIdUpdate}
                />
            </PaperLayout>
        </Grid>
    )
}

const EditWidgetTabsPane = ({context}) => {
    const { viewState } = useContext(GlobalContext)
    const {
        EditWidgetContext
    } = useContext(context)
    return(
        <Grid item {...viewState }>
            <PaperLayout>
                <TabsList pageTabs={ EditWidgetContext.editTabs } />
            </PaperLayout>
        </Grid>
    )
}

const EditWidgetLayout = ({context}) => {
    return(
        <Grid container spacing={3}>
            <EditWidgetTablePane context={context} />
            <EditWidgetTabsPane context={context} />
        </Grid>
    )
}

export default function BaseEditWidget({context}){
    return <EditWidgetLayout context={ context }/>
}