import React from "react";
import { Redirect, Route, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/Login/loginSlice";
import { setHistory } from "../features/History/historySlice";

const ProtectedRoute = ({ component, ...rest }: any) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	if (!user.authed) {
		dispatch(setHistory({ path: history.location.pathname }));
	}

	const routeComponent = (props: any) =>
		user.authed ? (
			React.createElement(component, props)
		) : (
			<Redirect to={{ pathname: "/login" }} />
		);
	return <Route {...rest} render={routeComponent} />;
};

export default ProtectedRoute;
