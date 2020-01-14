
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import LoginForm from '../Forms/LoginForm';
import GlobalContext from '../../providers/GlobalProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {
  const {
    handleLoginDialog,
    loginOpen,
    handleLogin
  } = useContext(GlobalContext)


  return (
    <div>
      <Dialog
        open={loginOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLoginDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Login using Training credentials"}</DialogTitle>
        <DialogContent>
            <LoginForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}