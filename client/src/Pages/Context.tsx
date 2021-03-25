import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import AuthService from 'src/Services/auth.service'

export const myContext = createContext<any>({})
const Context = (props: PropsWithChildren<any>) => {
  const authService = useMemo(() => new AuthService(), [])

  const [user, setUser] = useState()

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

  return <myContext.Provider value={user}>{props.children}</myContext.Provider>
}

export default Context
