import React from "react";
import Navbar from "./features/Navbar/Navbar";
import Dashboard from "./features/Dashboard/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<div className="w-screen h-screen flex flex-row">
				{/* Left navbar */}

				<Navbar />
				<Switch>
					{/* Dashboard:
				1) Chart
				2) Portfolio performance	
				*/}
					<Route exact path="/dashboard" component={Dashboard} />
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
