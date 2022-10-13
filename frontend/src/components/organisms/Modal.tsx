import { useEffect, useRef, useState } from 'react'
import { CreateApi, DeleteApi, GetAllApi, GetApi, UpdateApi } from '../../api/api'
import { Color, Note, NoteItem, Tag } from '../../api/models'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { Icon } from '../atoms/Icon'
import { Switcher } from '../atoms/Switcher'
import { ColorSelect, ColorSelectOption } from '../molecules/ColorSelect'
import { Select, SelectOption } from '../molecules/Select'

export const Modal = ({ id, onClose, onUpdate }: { id?: number; onClose: () => void; onUpdate: () => void }) => {
    // STATES
    const [header, setHeader] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [itemsText, setItemsText] = useState<{ [ID: number]: string | undefined }>({})
    const [newItemText, setNewItemText] = useState<string>('')
    const [newItemTextPlaceholder, setNewItemTextPlaceholder] = useState<string | null>('')
    const [note, setNote] = useState<Note>()
    const [isEdited, setIsEdited] = useState<boolean>(false)
    const [tags, setTags] = useState<SelectOption[]>()
    const [colors, setColors] = useState<ColorSelectOption[]>()
    const newItemRef = useRef<HTMLDivElement>(null)

    // EFFECTS
    useEffect(() => {
        if (id) {
            GetApi<Note>({
                model: 'Note',
                id: id,
                expand: ['Tags', 'NoteItems', 'Color'],
                onSuccess: res => {
                    setNote(res)
                    setHeader(res.Header || '')
                    setText(res.Text || '')
                    setItemsText({ ...res.NoteItems?.map(item => item.ID && { [item.ID]: item.Text }).reduce((acc, val) => ({ ...acc, ...val }), {}) })
                }
            })
        }

        GetAllApi<Tag>({
            model: 'Tag',
            onSuccess: res =>
                setTags(
                    res.map(
                        (t): SelectOption => ({
                            label: t.Name,
                            value: t.ID
                        })
                    )
                )
        })

        GetAllApi<Color>({
            model: 'Color',
            onSuccess: res =>
                setColors(
                    res.map(
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
            UpdateApi<Note>({
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
        CreateApi<Note>({
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
            UpdateApi<Note>({
                model: 'Note',
                id: id,
                data: { ...note },
                onSuccess: () => {
                    onUpdate()
                    onClose()
                }
            })
        }
    }

    const onArchiveClick = () => {
        if (id) {
            UpdateApi<Note>({
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
            UpdateApi<Note>({
                model: 'Note',
                id: id,
                data: { ...note, ColorID: colorId, Color: { ID: colorId } },
                onSuccess: () => {
                    onUpdate()
                    GetApi<Note>({
                        model: 'Note',
                        id: id,
                        expand: ['Tags', 'NoteItems', 'Color'],
                        onSuccess: res => setNote(res)
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
            UpdateApi<Note>({
                model: 'Note',
                id: id,
                data: { ...note, Tags: note?.Tags ? [...note?.Tags, { ID: tagId }] : [{ ID: tagId }] },
                onSuccess: () => {
                    onUpdate()
                    GetApi<Note>({
                        model: 'Note',
                        id: id,
                        expand: ['Tags', 'NoteItems', 'Color'],
                        onSuccess: res => setNote(res)
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

    const onCheckListClick = (type: 'text' | 'checklist') => {
        setNote(state => ({ ...state, CheckList: type === 'checklist' }))
        if (id) {
            UpdateApi<Note>({
                model: 'Note',
                id: id,
                data: { ...note, CheckList: type === 'checklist' },
                onSuccess: () => {
                    onUpdate()
                }
            })
        }
    }

    const onCheckboxClick = (noteItemId: number, checked: boolean) => {
        if (id) {
            setNote(state => ({
                ...state,
                NoteItems: state?.NoteItems?.map(item => (item.ID === noteItemId ? { ...item, Done: checked } : item))
            }))
            UpdateApi<NoteItem>({
                model: 'NoteItem',
                id: noteItemId,
                data: { NoteID: id, Done: checked },
                onSuccess: () => {
                    onUpdate()
                    GetApi<Note>({
                        model: 'Note',
                        id: id,
                        expand: ['Tags', 'NoteItems', 'Color'],
                        onSuccess: res => setNote(res)
                    })
                }
            })
        } else {
            setNote(state => ({
                ...state,
                NoteItems: state?.NoteItems?.map((item, i) => (i === noteItemId ? { ...item, Done: checked } : item))
            }))
        }
    }

    const onCheckListItemInput = (noteItemId: number, text: string) => {
        setItemsText(state => ({ ...state, [noteItemId]: text }))
        if (id) {
            setIsEdited(true)
        } else {
            setIsEdited(Boolean(text || header))
        }
    }

    const onCheckListItemInputBlur = (noteItemId: number) => {
        if (id) {
            setNote(state => ({
                ...state,
                NoteItems: state?.NoteItems?.map(item => (item.ID === noteItemId ? { ...item, Text: itemsText[noteItemId] } : item))
            }))
            UpdateApi<NoteItem>({
                model: 'NoteItem',
                id: noteItemId,
                data: { NoteID: id, Text: itemsText[noteItemId] },
                onSuccess: () => {
                    onUpdate()
                    GetApi<Note>({
                        model: 'Note',
                        id: id,
                        expand: ['Tags', 'NoteItems', 'Color'],
                        onSuccess: res => setNote(res)
                    })
                }
            })
        } else {
            setNote(state => ({
                ...state,
                NoteItems: state?.NoteItems?.map((item, i) => (i === noteItemId ? { ...item, Text: itemsText[noteItemId] } : item))
            }))
        }
    }

    const onCreateCheckListItem = () => {
        if (newItemText) {
            if (id) {
                CreateApi<NoteItem>({
                    model: 'NoteItem',
                    data: { NoteID: id, Text: newItemText },
                    onSuccess: () => {
                        onUpdate()
                        GetApi<Note>({
                            model: 'Note',
                            id: id,
                            expand: ['Tags', 'NoteItems', 'Color'],
                            onSuccess: res => {
                                setNote(res)
                                setItemsText({
                                    ...res.NoteItems?.map(item => item.ID && { [item.ID]: item.Text }).reduce((acc, val) => ({ ...acc, ...val }), {})
                                })
                            }
                        })
                    }
                })
            } else {
                setNote(state => ({
                    ...state,
                    NoteItems: state?.NoteItems ? [...state?.NoteItems, { Text: newItemText }] : [{ Text: newItemText }]
                }))
                setItemsText(state => ({ ...state, [Object.keys(state).length]: newItemText }))
            }
            setNewItemText('')
            setNewItemTextPlaceholder(state => (state === '' ? null : ''))
        }
    }

    const onNewItemTextInput = (text: string) => {
        setNewItemText(text)
        if (id) {
            setIsEdited(true)
        } else {
            setIsEdited(Boolean(text || header))
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
                                <Switcher
                                    value={note?.CheckList ? 1 : 0}
                                    tabs={[
                                        { icon: 'text', onClick: () => onCheckListClick('text') },
                                        { icon: 'checklist', onClick: () => onCheckListClick('checklist') }
                                    ]}
                                />
                                <ColorSelect
                                    icon="palette"
                                    options={colors}
                                    value={note?.ColorID || 1}
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
                                <Switcher
                                    value={note?.CheckList ? 1 : 0}
                                    tabs={[
                                        { icon: 'text', onClick: () => onCheckListClick('text') },
                                        { icon: 'checklist', onClick: () => onCheckListClick('checklist') }
                                    ]}
                                />
                            </div>

                            <div className="modal__button-group" id="mobile">
                                <Button icon={note?.Pinned ? 'pin-solid' : 'pin'} onClick={onPinClick} />
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

                                {note?.CheckList ? (
                                    <div className="checklist">
                                        {note.NoteItems?.map((noteItem, i) => (
                                            <div className="checklist__item" key={i}>
                                                <Checkbox
                                                    checked={noteItem.Done}
                                                    onClick={() =>
                                                        noteItem.ID ? onCheckboxClick(noteItem.ID, !noteItem.Done) : onCheckboxClick(i, !noteItem.Done)
                                                    }
                                                />
                                                <div className="editor__text">
                                                    <div
                                                        className={noteItem.Done ? 'editor__text-edit checked' : 'editor__text-edit'}
                                                        contentEditable
                                                        onInput={e =>
                                                            noteItem.ID
                                                                ? onCheckListItemInput(noteItem.ID, e.currentTarget.innerText)
                                                                : onCheckListItemInput(i, e.currentTarget.innerText)
                                                        }
                                                        onBlur={() => (noteItem.ID ? onCheckListItemInputBlur(noteItem.ID) : onCheckListItemInputBlur(i))}
                                                        suppressContentEditableWarning
                                                        spellCheck
                                                        aria-label="Текст..."
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter') {
                                                                newItemRef.current?.focus()
                                                                e.preventDefault()
                                                            }
                                                        }}
                                                    >
                                                        {noteItem.Text}
                                                    </div>
                                                    {(noteItem.ID ? !itemsText[noteItem.ID]?.trim() : !itemsText[i]?.trim()) && (
                                                        <div className="editor__placeholder">Текст...</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="checklist__item">
                                            <div className="checkbox">
                                                <Icon name="plus" />
                                            </div>
                                            <div className="editor__text">
                                                <div
                                                    className="editor__text-edit"
                                                    contentEditable
                                                    onInput={e => onNewItemTextInput(e.currentTarget.innerText)}
                                                    onClick={() => {}}
                                                    onBlur={onCreateCheckListItem}
                                                    suppressContentEditableWarning
                                                    spellCheck
                                                    aria-label="Новый пункт"
                                                    ref={newItemRef}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            onCreateCheckListItem()
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                >
                                                    {newItemTextPlaceholder}
                                                </div>
                                                {!newItemText?.trim() && <div className="editor__placeholder">Новый пункт</div>}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
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
                                )}
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
                                    value={note?.ColorID || 1}
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
