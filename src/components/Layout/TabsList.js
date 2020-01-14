import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


const TabsListAppBar = ({children, handleChange, value}) => {

  return(
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {children}
        </Tabs>
      </AppBar>
  )
}

export default function TabsList({pageTabs=[]}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <TabsListAppBar handleChange={handleChange} value={value}>
            {   
              (pageTabs.length >= 1) 
              ? pageTabs.map((item, i) => {
                  return (
                    <Tab label={item.label} index={i} key={i} {...a11yProps(i)} />
                  )
                }) // End map 
              : (<Tab label="No Headers" key={0} {...a11yProps(0)} />)
            }
        </TabsListAppBar>
      {
        pageTabs.map((item, i) => {
          return(
            <TabPanel index={i} value={value} key={i}>
                {item.component}
            </TabPanel>
          )
        })
      } 
    </div>
  );
}