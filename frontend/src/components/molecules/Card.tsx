import { Note } from '../../api/models'
import { Icon } from '../atoms/Icon'

export const Card = ({ note, onClick }: { note: Note; onClick: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div onClick={onClick} className="card" style={{ backgroundColor: note.Color?.Color, color: note.Color?.TextColor }}>
            {note.Pinned && (
                <div className="card__pin">
                    <Icon name="pin" size="16px" color={note.Color?.TextColor} />
                </div>
            )}
            {note.Header && (
                <div className="card__header" style={!note.Text && !note.NoteItems?.length ? { marginBottom: 0 } : {}}>
                    {note.Header}
                </div>
            )}
            {note?.CheckList
                ? note.NoteItems?.map((noteItem, i) => (
                      <div className="card__item" key={i}>
                          <div className="card__checkbox">
                              <Icon name={noteItem.Done ? 'checkbox' : 'square'} size="16px" color={note.Color?.TextColor} />
                          </div>
                          <div style={noteItem.Done ? { color: `${note.Color?.TextColor}90`, textDecoration: 'line-through' } : {}}>{noteItem.Text}</div>
                      </div>
                  ))
                : note.Text && <div className="card__body">{note.Text}</div>}
            {note.Tags && note.Tags?.length > 0 && (
                <div className="card__tags">
                    {note.Tags?.map(t => (
                        <div key={t.ID} className="card__tag">
                            {t.Name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
