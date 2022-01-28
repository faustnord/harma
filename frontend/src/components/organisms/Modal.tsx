import { useEffect, useState } from 'react'
import { CreateApi, DeleteApi, GetAllApi, GetApi, UpdateApi } from '../../api/api'
import { Color, Note, Tag } from '../../api/models'
import { Button } from '../atoms/Button'
import { ColorSelect, ColorSelectOption } from '../molecules/ColorSelect'
import { Select, SelectOption } from '../molecules/Select'

export const Modal = ({ id, onClose, onUpdate }: { id?: number; onClose: () => void; onUpdate: () => void }) => {
    // STATES
    const [header, setHeader] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [note, setNote] = useState<Note>()
    const [isEdited, setIsEdited] = useState<boolean>(false)
    const [tags, setTags] = useState<SelectOption[]>()
    const [colors, setColors] = useState<ColorSelectOption[]>()

    // EFFECTS
    useEffect(() => {
        if (id) {
            GetApi({
                model: 'Note',
                id: id,
                expand: ['Tags', 'NoteItems', 'Color'],
                onSuccess: res => {
                    setNote(res as Note)
                    setHeader((res as Note).Header || '')
                    setText((res as Note).Text || '')
                }
            })
        }

        GetAllApi({
            model: 'Tag',
            onSuccess: res =>
                setTags(
                    (res as Tag[]).map(
                        (t): SelectOption => ({
                            label: t.Name,
                            value: t.ID
                        })
                    )
                )
        })

        GetAllApi({
            model: 'Color',
            onSuccess: res =>
                setColors(
                    (res as Color[]).map(
                        (c): ColorSelectOption => ({
                            label: c.Name,
                            value: c.ID,
                            color: c.Color
                        })
                    )
                )
        })
    }, [id])

    // HANDLERS
    const onHeaderInput = (header: string) => {
        setHeader(header)
        if (id) {
            setIsEdited(true)
        } else {
            setIsEdited(Boolean(header || text))
        }
    }

    const onTextInput = (text: string) => {
        setText(text)
        if (id) {
            setIsEdited(true)
        } else {
            setIsEdited(Boolean(text || header))
        }
    }

    const onPinClick = () => {
        setNote(state => ({ ...state, Pinned: !state?.Pinned }))
        if (id) {
            UpdateApi({
                model: 'Note',
                id: id,
                data: { ...note, Pinned: !note?.Pinned },
                onSuccess: () => {
                    onUpdate()
                }
            })
        }
    }

    const onCreateClick = () => {
        CreateApi({
            model: 'Note',
            data: { ...note, UserID: 1, ColorID: 1 },
            onSuccess: () => {
                onUpdate()
                onClose()
            }
        })
    }

    const onSaveClick = () => {
        if (id) {
            UpdateApi({
                model: 'Note',
                id: id,
                data: note,
                onSuccess: () => {
                    onUpdate()
                    onClose()
                }
            })
        }
    }

    const onArchiveClick = () => {
        if (id) {
            UpdateApi({
                model: 'Note',
                id: id,
                data: { ...note, Archived: true },
                onSuccess: () => {
                    onUpdate()
                    onClose()
                }
            })
        }
    }

    const onDeleteClick = () => {
        if (id) {
            DeleteApi({
                model: 'Note',
                id: id,
                onSuccess: () => {
                    onUpdate()
                    onClose()
                }
            })
        }
    }

    const onColorSelect = (colorId: number) => {
        if (id) {
            UpdateApi({
                model: 'Note',
                id: id,
                data: { ...note, ColorID: colorId, Color: { ID: colorId } },
                onSuccess: () => {
                    onUpdate()
                    GetApi({
                        model: 'Note',
                        id: id,
                        expand: ['Tags', 'NoteItems', 'Color'],
                        onSuccess: res => {
                            setNote(res as Note)
                            setHeader((res as Note).Header || '')
                            setText((res as Note).Text || '')
                        }
                    })
                }
            })
        } else {
            setNote(state => {
                let col = colors?.find(c => c.value === colorId)
                return { ...state, ColorID: colorId, Color: { ID: colorId, Color: col?.color } }
            })
        }
    }

    const onTagSelect = (tagId: number) => {
        if (id) {
            UpdateApi({
                model: 'Note',
                id: id,
                data: { ...note, Tags: note?.Tags ? [...note?.Tags, { ID: tagId }] : [{ ID: tagId }] },
                onSuccess: () => {
                    onUpdate()
                    GetApi({
                        model: 'Note',
                        id: id,
                        expand: ['Tags', 'NoteItems', 'Color'],
                        onSuccess: res => {
                            setNote(res as Note)
                            setHeader((res as Note).Header || '')
                            setText((res as Note).Text || '')
                        }
                    })
                }
            })
        } else {
            setNote(state => {
                let tag = tags?.find(t => t.value === tagId)
                return { ...state, Tags: state?.Tags ? [...state?.Tags, { ID: tagId, Name: tag?.label }] : [{ ID: tagId, Name: tag?.label }] }
            })
        }
    }

    // TEMPLATE
    return (
        <>
            {(id ? note : true) && (
                <div className="modal">
                    <div className="modal__background"></div>
                    <div className="modal__window">
                        <div className="modal__header">
                            <div className="modal__button-group" id="desktop">
                                <ColorSelect
                                    icon="palette"
                                    options={colors}
                                    value={note?.ColorID}
                                    color={note?.Color?.Color || '#f3f3f3'}
                                    onChange={colorId => onColorSelect(colorId)}
                                />
                                <Select icon="tag" options={tags} onChange={tagId => onTagSelect(tagId)} />
                                {id && <Button icon="archive" onClick={onArchiveClick} />}
                                {id && <Button icon="trash" onClick={onDeleteClick} />}
                            </div>

                            <div className="modal__button-group" id="desktop">
                                <Button icon={note?.Pinned ? 'pin-solid' : 'pin'} onClick={onPinClick} />
                                <Button icon={isEdited ? 'check' : 'close'} onClick={isEdited ? (id ? onSaveClick : onCreateClick) : onClose} />
                            </div>

                            <div id="mobile">
                                <Button icon={note?.Pinned ? 'pin-solid' : 'pin'} onClick={onPinClick} />
                            </div>

                            <div id="mobile">
                                <Button icon={isEdited ? 'check' : 'close'} onClick={isEdited ? (id ? onSaveClick : onCreateClick) : onClose} />
                            </div>
                        </div>

                        <div className="modal__body">
                            <div className="editor">
                                <div className="editor__header">
                                    <div
                                        className="editor__header-edit"
                                        contentEditable
                                        onInput={e => onHeaderInput(e.currentTarget.innerText)}
                                        onBlur={() => setNote(state => ({ ...state, Header: header }))}
                                        suppressContentEditableWarning
                                        spellCheck
                                        aria-label="Введите заголовок"
                                    >
                                        {note?.Header}
                                    </div>
                                    {!header?.trim() && <div className="editor__placeholder">Введите заголовок</div>}
                                </div>

                                <div className="editor__text">
                                    <div
                                        className="editor__text-edit"
                                        contentEditable
                                        onInput={e => onTextInput(e.currentTarget.innerText)}
                                        onBlur={() => setNote(state => ({ ...state, Text: text }))}
                                        suppressContentEditableWarning
                                        spellCheck
                                        aria-label="Текст заметки..."
                                    >
                                        {note?.Text}
                                    </div>
                                    {!text?.trim() && <div className="editor__placeholder">Текст заметки...</div>}
                                </div>
                            </div>

                            <div className="modal__tags">
                                {note?.Tags?.map(t => (
                                    <div key={t.ID} className="modal__tag">
                                        {t.Name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="modal__footer">
                            <div className="modal__button-group" id="mobile">
                                <ColorSelect
                                    icon="palette"
                                    options={colors}
                                    value={note?.ColorID}
                                    color={note?.Color?.Color || '#f3f3f3'}
                                    onChange={colorId => onColorSelect(colorId)}
                                />
                                <Select icon="tag" options={tags} onChange={tagId => onTagSelect(tagId)} />
                            </div>

                            <div className="modal__button-group" id="mobile">
                                {id && <Button icon="archive" onClick={onArchiveClick} />}
                                {id && <Button icon="trash" onClick={onDeleteClick} />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
