import React from "react";
import Navbar from "../Navbar/Navbar";
import { Route, Switch } from "react-router";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
	return (
		<>
			<Navbar />
			<Route exact path="/dashboard" component={Dashboard} />
		</>
	);
};

export default Home;
