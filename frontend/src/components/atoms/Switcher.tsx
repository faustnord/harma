import { useState } from 'react'
import { Icon, IconName } from './Icon'

type SwitcherType = {
    tabs: { icon: IconName; onClick: React.MouseEventHandler<HTMLButtonElement> }[]
    value: number
}

export const Switcher = ({ tabs, value }: SwitcherType) => {
    const [active, setActive] = useState<number>(value || 0)
    return (
        <div className="switcher">
            {tabs.map((tab, i) => (
                <button
                    className={active === i ? 'switcher__button active' : 'switcher__button'}
                    key={i}
                    onClick={e => {
                        setActive(i)
                        tab.onClick(e)
                    }}
                >
                    <Icon name={tab.icon} color={active === i ? '#555555' : undefined} />
                </button>
            ))}
        </div>
    )
}
