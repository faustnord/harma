import { Icon, IconName } from './Icon'

type ButtonType = {
    icon: IconName
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    color?: string
}

export const Button = ({ icon, onClick, color }: ButtonType) => {
    return (
        <button className="button" onClick={onClick} style={{ backgroundColor: color }}>
            <Icon name={icon} />
        </button>
    )
}
