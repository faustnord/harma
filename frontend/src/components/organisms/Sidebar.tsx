import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GetAllApi } from '../../api/api'
import { Tag } from '../../api/models'
import { Icon } from '../atoms/Icon'

export const Sidebar = () => {
    // STATES
    const [tags, setTags] = useState<Tag[]>()

    // EFFECTS
    useEffect(() => {
        GetAllApi<Tag>({
            model: 'Tag',
            onSuccess: res => setTags(res)
        })
    }, [])

    // TEMPLATE
    return (
        <div className="sidebar">
            <Icon name="logo" className="sidebar__logo" />

            <NavLink exact className="sidebar__item" activeClassName="sidebar__item -active" to="/">
                <Icon className="sidebar__icon" name="stack" />
                Заметки
            </NavLink>

            <NavLink exact className="sidebar__item" activeClassName="sidebar__item -active" to="/archive">
                <Icon className="sidebar__icon" name="archive" />
                Архив
            </NavLink>

            {tags?.map(tag => (
                <NavLink exact key={tag.ID} className="sidebar__item" activeClassName="sidebar__item -active" to={`/tag/${tag.ID}` || '/'}>
                    <Icon className="sidebar__icon" name="tag" />
                    {tag.Name}
                </NavLink>
            ))}
        </div>
    )
}
