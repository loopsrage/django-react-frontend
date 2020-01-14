import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ButtonGroup, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, Button, Box } from '@material-ui/core';
import TextInput from '../InputElements/TextInput';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList({context, button_actions}) {
  const classes = useStyles();
  const {
      classServers,
      handleServersLoad,
      editWidgetFormState
  } = useContext(context)

  useEffect(() => {
    handleServersLoad(editWidgetFormState.id)
  }, [editWidgetFormState.id])
  
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {
            (classServers.length > 0)
            ? (
                classServers.map(value => {
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value)}>
                                    <ListItemText id={labelId} primary={`Server Cname: ${value.cname}`} />
                                </ListItem>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Box display="flex"  bgcolor="background.paper">
                                    <Box p={1} mt={3}>
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                            {
                                                (button_actions.length > 0)
                                                ? button_actions.map(button => button)
                                                : <div>Loading Buttons...</div>
                                            }
                                        </ButtonGroup>
                                    </Box>
                                </Box>
                                <Box display="flex"  bgcolor="background.paper">
                                    <Box p={1}>
                                        {
                                            Object.keys(value).map(key => {
                                                return <TextInput disabled label={key} value={value[key]} />
                                            })
                                        }
                                    </Box>
                                </Box>

                            </ExpansionPanelDetails>
                    </ExpansionPanel>
                    );
                })
            ) : (
                <div>loading...</div>
            )
      }
    </List>
  );
}