import { Icon } from './Icon'

export const Checkbox = ({ checked = false, onClick }: { checked?: boolean; onClick: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div className="checkbox">
            <div className="checkbox__box" onClick={onClick}>
                <Icon name={checked ? 'checkbox' : 'square'} size="18px" />
            </div>
        </div>
    )
}
