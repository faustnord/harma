import { useState } from 'react'
import { Button } from '../atoms/Button'
import { Icon, IconName } from '../atoms/Icon'

export const ColorSelect = ({
    icon,
    value,
    options,
    onChange,
    color
}: {
    icon: IconName
    value?: number
    options: { label: string; value: number; color?: string }[]
    onChange: (value: number) => void
    color?: string
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [mouseOver, setMouseOver] = useState<boolean>(false)

    return (
        <div
            className="color-select"
            tabIndex={0}
            onBlur={() => !mouseOver && setOpen(false)}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            <Button icon={icon} color={color} onClick={() => setOpen(state => !state)} />
            {open && (
                <div className="color-select__options">
                    {options?.map(o => (
                        <div className="color-select__color-box">
                            <div key={o.value} className="color-select__color" style={{ backgroundColor: o.color }} onClick={() => onChange(o.value)} />
                            {o.value === value && <Icon name="check" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
