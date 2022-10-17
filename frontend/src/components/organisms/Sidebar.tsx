import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GetAllApi } from '../../api/api'
import { Tag } from '../../api/models'
import { Context } from '../../context'
import { Icon } from '../atoms/Icon'

export const Sidebar = () => {
    // STATES
    const [tags, setTags] = useState<Tag[]>()

    const { setContext } = useContext(Context)

    const onClickItem = () => {
        setContext(state => ({ ...state, showSidebar: false, scrollBlocked: false }))
    }

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

            <NavLink exact className="sidebar__item" activeClassName="-active" to="/" onClick={onClickItem}>
                <Icon className="sidebar__icon" name="stack" />
                Заметки
            </NavLink>

            <NavLink exact className="sidebar__item" activeClassName="-active" to="/archive" onClick={onClickItem}>
                <Icon className="sidebar__icon" name="archive" />
                Архив
            </NavLink>

            {tags?.map(tag => (
                <NavLink exact key={tag.ID} className="sidebar__item" activeClassName="-active" to={`/tag/${tag.ID}` || '/'} onClick={onClickItem}>
                    <Icon className="sidebar__icon" name="tag" />
                    {tag.Name}
                </NavLink>
            ))}
        </div>
    )
}
