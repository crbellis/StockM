import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./features/Login/Login";
import Home from "./features/Home/Home";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<div className="w-screen h-screen flex flex-row overflow-y-hidden">
				<Switch>
					<Route exact path="/login" component={Login} />
					<ProtectedRoute path="/" component={Home} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
