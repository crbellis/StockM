import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./features/Login/Login";
import Home from "./features/Home/Home";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import SignUp from "./features/SignUp/SignUp";

function App() {
	return (
		<div className="w-screen h-screen flex flex-row overflow-y-hidden">
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
				<ProtectedRoute path="/" component={Home} />
			</Switch>
		</div>
	);
}

export default App;
