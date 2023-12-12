import { useContext, useEffect } from 'react'
import { Context } from '../../context'
import { Button } from '../atoms/Button'
import { Sidebar } from './Sidebar'

type MobileSidebarType = { onClose: () => void }

export const MobileSidebar = ({ onClose }: MobileSidebarType) => {
    const { setContext } = useContext(Context)

    const onModalClose = () => {
        onClose()
        setContext(state => ({ ...state, scrollBlocked: false }))
    }

    useEffect(() => {
        setContext(state => ({ ...state, scrollBlocked: true }))
    }, [setContext])

    return (
        <>
            <div className="modal__background" onClick={onModalClose} />
            <Sidebar />
            <div className="mobile-sidebar__close-button">
                <Button icon="close" onClick={onModalClose} />
            </div>
        </>
    )
}
