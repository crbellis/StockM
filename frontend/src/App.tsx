import React from "react";
import Navbar from "./features/Navbar/Navbar";
import Dashboard from "./features/Dashboard/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./features/Login/Login";
import Home from "./features/Home.tsx/Home";

function App() {
	return (
		<BrowserRouter>
			<div className="w-screen h-screen flex flex-row">
				{/* Left navbar */}

				<Switch>
					<Route exact path="/login" component={Login} />
					{/* Dashboard:
				1) Chart
				2) Portfolio performance	
				*/}
					<Route path="/" component={Home} />
				</Switch>
				{/* Stats:
		1) trending stocks
		2) portfolio Stats
		*/}
			</div>
		</BrowserRouter>
	);
}

export default App;
