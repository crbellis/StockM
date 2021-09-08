import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../features/Login/loginSlice";

const ProtectedRoute = ({ component, ...rest }: any) => {
	const user = useSelector(selectUser);
	const routeComponent = (props: any) =>
		user.authed ? (
			React.createElement(component, props)
		) : (
			<Redirect to={{ pathname: "/login" }} />
		);
	return <Route {...rest} render={routeComponent} />;
};

export default ProtectedRoute;
