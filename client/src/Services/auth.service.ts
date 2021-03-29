import axios, { AxiosInstance } from 'axios'

class AuthService {
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true,
    })
  }

  signUp = (userData: SignUpData) => {
    return this.api.post<SignInResponse>('/signup', userData, { withCredentials: true })
  }

  signIn = (userData: SignInData) => {
    return this.api.post<SignInResponse>('/signin', userData, { withCredentials: true })
  }
  getUser = () => {
    return this.api.get<GetUserResponse>('/user', { withCredentials: true })
  }
  signOut = () => {
    return this.api.get('/signout', { withCredentials: true })
  }
}

type SignInData = {
  username: string
  password: string
}
type SignUpData = SignInData & { confirmPassword: string }

type SignInResponse = GetUserResponse | string

type GetUserResponse = {
  username?: string
  isAdmin?: boolean
}

export default AuthService
