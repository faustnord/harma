import { Route, Switch } from 'react-router-dom'
import { routes } from '../routes'
import '../styles/App.scss'
import { Sidebar } from './organisms/Sidebar'

export const App = () => {
    return (
        <div className="App">
            <div className="body">
                <Sidebar />
                <div className="main">
                    <Switch>
                        {routes.map((route, i) => (
                            <Route exact path={route.path} key={i + route.path}>
                                <route.component title={`Harma — ${route.title}`} />
                            </Route>
                        ))}
                    </Switch>
                </div>
            </div>
        </div>
    )
}
