import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Login from './views/login/Login'
import routes from './routers/Router'
import NavBar from './components/navbar/NavBar'
import NavBarLogin from './components/navbar/NavBarLogin'
import CopyRight from './components/footer/CopyRight'
import './App.scss'

const history = createBrowserHistory()

const routerMatch = () => {
  const renderRoutes = () => {
    return routes.map(router => {
      if (router.children && router.children.length > 0) {
        return router.children.map(item => {
          return <Route path={item.path} key={item.path} component={item.component} />
        })
      } else {
        return <Route path={router.path} key={router.path} exact={router.exact} component={router.component} />
      }
    })
  }

  return (
    <>
      <NavBar />
      <main className="GlobalMainContainer">{renderRoutes()}</main>
      <CopyRight />
    </>
  )
}

const App: React.FC = () => {
  const renderLogin = () => {
    return (
      <div className="GlobalLoginPage">
        <NavBarLogin />
        <main className="GlobalMainContainer">
          <Login />
        </main>
        <CopyRight />
      </div>
    )
  }
  return (
    <Router history={history}>
      <Switch>
        <Route path={'/login'} key={'/login'} render={renderLogin} />
        <Route path="/" exact={true} render={() => <Redirect to="/introduction/background" />} />
        <Route path="/introduction" exact={true} render={() => <Redirect to="/introduction/background" />} />
        <Route path="/experiment" exact={true} render={() => <Redirect to="/experiment/index" />} />
        {routerMatch()}
      </Switch>
    </Router>
  )
}

export default App
