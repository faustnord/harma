import { Note } from '../../api/models'
import { Pin } from '../atoms/Pin'

export const Card = ({ note, onClick }: { note: Note; onClick: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div onClick={onClick} className="card" style={{ backgroundColor: note.Color?.Color, color: note.Color?.TextColor }}>
            {note.Pinned && <Pin color={note.Color?.TextColor} />}
            {note.Header && (
                <div className="card__header" style={!note.Text ? { marginBottom: 0 } : {}}>
                    {note.Header}
                </div>
            )}
            {note.Text && <div className="card__body">{note.Text}</div>}
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
