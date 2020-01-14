import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavigationContext from "../../providers/NavigationProvider";
import { Link } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

function SideBarDataHelper({sideBarData}){
    const classes = useStyles();
    
    return Object.keys(sideBarData).map((key, i) => {
      let {name, href, icon} = sideBarData[key];
      return (
          <ListItem button key={name} >
            <Link to={href}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name}  />
            </Link>
          </ListItem>
      );
  })
}

export default function DrawerLayout() {
  const classes = useStyles();
  const theme = useTheme();
  const { sideBarData, drawerOpen, toggleDrawerCallback} = useContext(NavigationContext);
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawerCallback}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <List component="nav">
        <SideBarDataHelper sideBarData={sideBarData}/>
      </List>
  </Drawer>
  );
}
