import { useCallback, useEffect, useState } from 'react'
import { GetApi } from '../../api/api'
import { Note, Tag } from '../../api/models'
import Masonry from 'react-masonry-component'
import { Modal } from '../organisms/Modal'
import { Card } from '../molecules/Card'
import { Search } from '../atoms/Search'
import { useParams } from 'react-router-dom'

export const TaggedNotes = ({ title }: { title: string }) => {
    const params = useParams<{ id: string }>()

    // STATES
    const [notes, setNotes] = useState<Note[]>()
    const [toggleModal, setToggleModal] = useState<boolean>()
    const [currentId, setCurrentId] = useState<number>()

    // CALLBACKS
    const GetAllNotes = useCallback(() => {
        GetApi<Tag>({
            model: 'Tag',
            id: Number(params.id),
            onSuccess: res => setNotes(res.Notes),
            expand: ['Notes/Tags', 'Notes/NoteItems', 'Notes/Color']
        })
    }, [params.id])

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
                <Search />
            </div>

            <Masonry className="notes" style={toggleModal ? { overflow: 'hidden' } : {}} options={{ transitionDuration: 200 }}>
                {notes
                    ?.filter(note => !note.Archived)
                    .map(note => (
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
