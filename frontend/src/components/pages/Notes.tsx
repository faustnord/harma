import { useCallback, useEffect, useState } from 'react'
import { GetAllApi } from '../../api/api'
import { Note } from '../../api/models'
import Masonry from 'react-masonry-component'
import { Modal } from '../organisms/Modal'
import { Card } from '../molecules/Card'
import { Search } from '../atoms/Search'
import { Button } from '../atoms/Button'

export const Notes = ({ title }: { title: string }) => {
    // STATES
    const [notes, setNotes] = useState<Note[]>()
    const [toggleModal, setToggleModal] = useState<boolean>()
    const [currentId, setCurrentId] = useState<number>()
    const [search, setSearch] = useState<string>()

    // CALLBACKS
    const GetAllNotes = useCallback(() => {
        GetAllApi({
            model: 'Note',
            onSuccess: res => setNotes(res as Note[]),
            expand: ['Tags', 'NoteItems', 'Color'],
            sort: ['Pinned@desc', 'ID@desc'],
            filter: ['Archived:ne:true', `Text:like:${search?.toLowerCase() || ''}`]
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
                <Search onChange={e => setSearch(e.target.value)} />
                <Button
                    icon="plus"
                    onClick={() => {
                        setToggleModal(true)
                        setCurrentId(undefined)
                    }}
                />
            </div>

            <Masonry className="notes" style={toggleModal ? { overflow: 'hidden' } : {}} options={{ transitionDuration: 200 }}>
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
