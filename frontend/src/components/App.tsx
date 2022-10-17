import { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Context } from '../context'
import { routes } from '../routes'
import '../styles/App.scss'
import { useBreakpoint } from '../utils/useBreakpoint'
import { MobileSidebar } from './organisms/MobileSidebar'
import { Sidebar } from './organisms/Sidebar'

export const App = () => {
    const { context, setContext } = useContext(Context)

    useBreakpoint({ mobile: 720, tablet: 1200 })

    return (
        <div className="App">
            <div className="body">
                {context.screenSize === 'desktop' ? (
                    <Sidebar />
                ) : (
                    context.showSidebar && <MobileSidebar onClose={() => setContext(state => ({ ...state, showSidebar: false }))} />
                )}

                <div className={context.scrollBlocked ? 'main scroll-blocked' : 'main'}>
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
