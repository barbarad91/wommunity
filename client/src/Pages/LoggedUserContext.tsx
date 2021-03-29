import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import AuthService from 'src/Services/auth.service'

const LoggedUserContext = createContext<LoggedUserContextData | undefined>(undefined)

export const useLoggedUserContext = () => {
  const context = useContext(LoggedUserContext)

  if (!context) throw new Error('error')

  return context
}

const UserContext: FunctionComponent = (props) => {
  const authService = useMemo(() => new AuthService(), [])

  const [user, setUser] = useState<User | undefined>(undefined)

  const fetchUser = useCallback(async () => {
    try {
      const fetchData = await authService.getUser()

      setUser(fetchData.data)
    } catch (error) {
      console.error(error)
    }
  }, [authService])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return <LoggedUserContext.Provider value={{ user, setUser }}>{props.children}</LoggedUserContext.Provider>
}

type LoggedUserContextData = {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
}

type User = {
  username: string
  isAdmin: boolean
}

export default UserContext
