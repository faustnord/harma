import { Icon } from './Icon'

export const Pin = ({ color = '#555555' }: { color?: string }) => {
    return (
        <button className="pin">
            <Icon name="pin" size="16px" color={color} />
        </button>
    )
}
