import { useCallback, useContext, useEffect, useState } from 'react'
import { GetAllApi } from '../../api/api'
import { Note } from '../../api/models'
import Masonry from 'react-masonry-component'
import { Modal } from '../organisms/Modal'
import { Card } from '../molecules/Card'
import { Search } from '../atoms/Search'
import { Button } from '../atoms/Button'
import { Context } from '../../context'

export const Archive = ({ title }: { title: string }) => {
    // STATES
    const [notes, setNotes] = useState<Note[]>()
    const [toggleModal, setToggleModal] = useState<boolean>()
    const [currentId, setCurrentId] = useState<number>()
    const [search, setSearch] = useState<string>()

    const { context, setContext } = useContext(Context)

    // CALLBACKS
    const GetAllNotes = useCallback(() => {
        GetAllApi<Note>({
            model: 'Note',
            onSuccess: res => setNotes(res),
            expand: ['Tags', 'NoteItems', 'Color'],
            sort: ['Pinned@desc', 'ID@desc'],
            filter: ['Archived:eq:true', search ? `Text:like:${search?.toLowerCase()}` : '']
        })
    }, [search])

    // EFFECTS
    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        GetAllNotes()
    }, [GetAllNotes])

    // TEMPLATE
    return (
        <>
            <div className="header">
                {context.screenSize !== 'desktop' && (
                    <Button
                        icon="burger"
                        onClick={() => {
                            setContext(state => ({ ...state, showSidebar: true }))
                        }}
                    />
                )}
                <Search onChange={e => setSearch(e.target.value)} />
            </div>

            <Masonry className="notes" options={{ transitionDuration: 200 }}>
                {notes?.map(note => (
                    <Card
                        key={note.ID}
                        note={note}
                        onClick={() => {
                            setToggleModal(true)
                            setCurrentId(note.ID)
                        }}
                    />
                ))}
            </Masonry>
            {toggleModal && <Modal id={currentId} onUpdate={GetAllNotes} onClose={() => setToggleModal(false)} />}
        </>
    )
}
