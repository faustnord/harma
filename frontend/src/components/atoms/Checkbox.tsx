import { Icon } from './Icon'

type CheckboxType = {
    checked?: boolean
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Checkbox = ({ checked = false, onClick }: CheckboxType) => {
    return (
        <div className="checkbox">
            <div className="checkbox__box" onClick={onClick}>
                <Icon name={checked ? 'checkbox' : 'square'} size="18px" />
            </div>
        </div>
    )
}
