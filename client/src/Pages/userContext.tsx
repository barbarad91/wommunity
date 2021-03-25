import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import AuthService from 'src/Services/auth.service'

export const loggedUserContext = createContext<any>({})
const UserContext = (props: PropsWithChildren<any>) => {
  const authService = useMemo(() => new AuthService(), [])

  const [user, setUser] = useState({})

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

  return <loggedUserContext.Provider value={{ user, setUser }}>{props.children}</loggedUserContext.Provider>
}

export default UserContext
