import React, {useContext} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Button, TextField, Box, Fab } from '@material-ui/core';
import NavigationContext from '../../providers/NavigationProvider';
import { GiTeacher, GiRoundBottomFlask } from 'react-icons/gi'
import { MdViewStream } from 'react-icons/md'
import { FaCat, FaPencilAlt, FaQuestion, FaServer, FaWhmcs, FaUserAlt } from 'react-icons/fa'
import GlobalContext from '../../providers/GlobalProvider';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title:{
    flexGrow: 1
  },
  search:{
    margin: [10,10,10,10]
  }
}));

export default function Sidebar({ children }) {

  const {
    handleViewStateToggle,
    userIsLoggedIn,
    handleLoginDialog
  } = useContext(GlobalContext)

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Venafi Training
          </Typography>
          <Box display="flex" justifyContent="center">
            <Box mr={1} mt={1}>
              <IconButton onClick={handleViewStateToggle} size="medium">
                <MdViewStream />
              </IconButton>
            </Box>
            <Box mr={2} mt={1}>
              {
                (userIsLoggedIn)
                ? (
                  <div>
                    <IconButton size="medium" aria-controls="simple-menu" aria-haspopup="true" onClick={handleUserClick}>
                      <FaUserAlt />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleUserClose}
                    >
                      <Link to="/my-account"><MenuItem>My account</MenuItem></Link>
                      <Link to="/logout"><MenuItem>Logout</MenuItem></Link>
                    </Menu>
                  </div>
                )
                : <></>
              }
            </Box>
            <Box mr={1.7} mt={.5}>
              <TextField size='small' placeholder='Search' mr='auto' margin='normal'/>
            </Box>
            <Box p={2}>
              {
                (!userIsLoggedIn)
                ? <Button onClick={handleLoginDialog}>Login</Button>
                : <></>
              }
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
          <List>
            {
              (!userIsLoggedIn)
              ? 
                (
                  <Link to='/classes'>
                    <ListItem button key={0}>
                      <ListItemIcon><GiTeacher/></ListItemIcon>
                      <ListItemText primary="Classes" />
                    </ListItem>
                  </Link>
                )
              : 
                (
                  <>
                  <Link to='/classes'>
                    <ListItem button key={0}>
                      <ListItemIcon><GiTeacher/></ListItemIcon>
                      <ListItemText primary="Classes" />
                    </ListItem>
                  </Link>
                  <Link to='/classtypes'>
                    <ListItem button key={1}>
                      <ListItemIcon><FaWhmcs /></ListItemIcon>
                      <ListItemText primary="Class Types" />
                    </ListItem>
                  </Link>
                  <Link to='/labs'>
                    <ListItem button key={2}>
                      <ListItemIcon><GiRoundBottomFlask /></ListItemIcon>
                      <ListItemText primary="Labs" />
                    </ListItem>
                  </Link>
                  <Link to='/tests'>
                    <ListItem button key={3}>
                      <ListItemIcon><FaPencilAlt /></ListItemIcon>
                      <ListItemText primary="Tests" />
                    </ListItem>
                  </Link>
                  <Link to='/questions'>
                    <ListItem button key={4}>
                      <ListItemIcon><FaQuestion/></ListItemIcon>
                      <ListItemText primary="Questions" />
                    </ListItem>
                  </Link>
                  <Link to='/question-categories'>
                    <ListItem button key={4}>
                      <ListItemIcon><FaCat /></ListItemIcon>
                      <ListItemText primary="Question Categories" />
                    </ListItem>
                  </Link>
                  <Link to='/aws'>
                    <ListItem button key={4}>
                      <ListItemIcon><FaServer /></ListItemIcon>
                      <ListItemText primary="Aws" />
                    </ListItem>
                  </Link>
                  </>
                )
            }
          </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
