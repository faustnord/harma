import { Icon, IconName } from './Icon'

export const Button = ({ icon, onClick, color }: { icon: IconName; onClick?: React.MouseEventHandler<HTMLButtonElement>; color?: string }) => {
    return (
        <button className="button" onClick={onClick} style={{ backgroundColor: color }}>
            <Icon name={icon} />
        </button>
    )
}
