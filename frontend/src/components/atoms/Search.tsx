import { Icon } from './Icon'

type SearchType = { onChange?: React.ChangeEventHandler<HTMLInputElement> }

export const Search = ({ onChange }: SearchType) => {
    return (
        <div className="search">
            <input className="search__input" type="text" placeholder="Поиск" onChange={onChange} />
            <Icon className="search__icon" name="search" color="#bbbbbb" />
        </div>
    )
}
