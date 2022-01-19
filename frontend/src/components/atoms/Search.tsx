import { Icon } from './Icon'

export const Search = ({ onChange }: { onChange?: React.ChangeEventHandler<HTMLInputElement> }) => {
    return (
        <div className="search">
            <input className="search__input" type="text" placeholder="Поиск" onChange={onChange} />
            <Icon className="search__icon" name="search" color="#bbbbbb" />
        </div>
    )
}
