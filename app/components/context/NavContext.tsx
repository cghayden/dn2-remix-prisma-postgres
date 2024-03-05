import { createContext, useContext, useState, type ReactNode } from 'react'

interface NavigationContextProps {
  showNav: boolean
  toggleShowNav: () => void
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
)

interface NavigationProviderProps {
  children: ReactNode
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [showNav, setShowNav] = useState(false)

  const toggleShowNav = () => {
    console.log('firing toggler')
    setShowNav(!showNav)
  }

  return (
    <NavigationContext.Provider value={{ showNav, toggleShowNav }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavContext = () => {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
