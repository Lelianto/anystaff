import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import store from '../redux/store/index';
import { Provider } from "react-redux"
import Page from '../pages/index'


const MainRoute: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Page} />
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}
export default MainRoute;