import { PropsWithChildren, createContext, useContext,  useState } from 'react'
import { UserInterface } from '../types/types'
// import Cookies from 'universal-cookie'
import { cookies } from '../utils'

interface AuthContextInterface {
   user: UserInterface | null
   setUserFunction: (userObject: UserInterface) => void
   logout: () => void
}

const AuthContext = createContext<AuthContextInterface | null>(null)

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const initialUserValue = cookies.get('panda-eats-cookies') ?? null
   const [user, setUser] = useState<UserInterface | null>(initialUserValue)

   const logout = () => {
      cookies.remove('panda-eats-cookies', {path: "/"})
      setUser(null)

   }

   const setUserFunction = (userObject : UserInterface) => {
      setUser(userObject)
   }

   return (
      <AuthContext.Provider value={{ user, setUserFunction, logout }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContextProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalAuth = () => {
   return useContext(AuthContext)
}
