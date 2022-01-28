import { useState } from 'react'
import { Button } from '../atoms/Button'
import { IconName } from '../atoms/Icon'

export type SelectOption = { label?: string; value?: number }

export const Select = ({
    icon,
    value,
    options,
    onChange,
    color
}: {
    icon: IconName
    value?: number
    options?: SelectOption[]
    onChange: (value: number) => void
    color?: string
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [mouseOver, setMouseOver] = useState<boolean>(false)

    return (
        <div
            className="select"
            tabIndex={0}
            onBlur={() => !mouseOver && setOpen(false)}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            <Button icon={icon} color={color} onClick={() => setOpen(state => !state)} />
            {open && (
                <div className="select__options">
                    {options?.map(o => (
                        <div key={o.value} className="select__option" onClick={() => o.value && onChange(o.value)}>
                            {o.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
