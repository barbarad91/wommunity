import { useContext } from 'react'
import { myContext } from './Context'

const Homepage = () => {
  const ctx = useContext(myContext)
  console.log(ctx)
  return <div>Welcome to homepage</div>
}
export default Homepage
