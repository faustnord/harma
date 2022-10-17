import { useEffect, useContext } from 'react'
import { Context } from '../context'

export const useBreakpoint = ({ mobile, tablet }: { mobile: number; tablet: number }) => {
    const { context, setContext } = useContext(Context)

    useEffect(() => {
        const checkReached = () => {
            if (window.innerWidth <= mobile) {
                setContext(state => ({ ...state, screenSize: 'mobile' }))
            }
            if (window.innerWidth > mobile && window.innerWidth <= tablet) {
                setContext(state => ({ ...state, screenSize: 'tablet' }))
            }
            if (window.innerWidth > tablet) {
                setContext(state => ({ ...state, screenSize: 'desktop' }))
            }
        }

        checkReached()

        window.addEventListener('resize', checkReached)

        return () => window.removeEventListener('resize', checkReached)
    }, [mobile, setContext, tablet])

    return context.screenSize
}
