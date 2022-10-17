import { createContext, ReactNode, useState } from 'react'

type ContextValueType = { scrollBlocked: boolean; showSidebar: boolean; screenSize: 'mobile' | 'tablet' | 'desktop' | undefined }

type ContextType = {
    context: ContextValueType
    setContext: React.Dispatch<React.SetStateAction<ContextValueType>>
}

const initialContext: ContextValueType = { scrollBlocked: false, showSidebar: false, screenSize: undefined }

export const Context = createContext<ContextType>({ context: initialContext, setContext: () => {} })

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [context, setContext] = useState<ContextValueType>(initialContext)

    return <Context.Provider value={{ context, setContext }}>{children}</Context.Provider>
}
