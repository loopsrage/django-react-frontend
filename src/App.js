import React, { useContext } from "react";
import { hot } from "react-hot-loader";
import { ContextProvider } from './providers/ContextProvider';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Classes from "./apps/Classes";
import Aws from "./apps/Aws";
import ClassTypes from "./apps/ClassTypes";
import Labs from "./apps/Labs";
import Questions from "./apps/Questions";
import Tests from "./apps/Tests";
import Logout from './apps/Logout';
import MyAccount from './apps/MyAccount'
import Sidebar from "./components/Layout/Sidebar";
import LoginDialog from './components/Dialogs/LoginDialog';
import { GlobalProvider } from "./providers/GlobalProvider";
import QuestionCategory from './apps/QuestionCategory'


const App = () => {
	const page = (
		<Router>
			<ContextProvider >
					<Sidebar>
						<Switch>
							{/* Define sub application urls */}
							<Route exact path='/classes' component={Classes} />
							<Route path='/classtypes' component={ClassTypes} />
							<Route path='/labs' component={Labs} />
							<Route path='/tests' component={Tests} />
							<Route exact path='/questions' component={Questions}/>
							<Route path='/question-categories' component={QuestionCategory} />
							<Route exact path='/aws' component={Aws} />
							<Route exact path='/logout' component={Logout} />
							<Route exact path='/my-account' component={MyAccount} />
							<Route exact path='/' component={Classes} />
						</Switch>
					</Sidebar>
					<LoginDialog />
			</ContextProvider>
		</Router>
	);
	return page;
}
export default hot(module)(App);
