import axios, { AxiosInstance } from 'axios'

class AuthService {
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    })
  }

  signIn = (userData: SignInData) => {
    return this.api.post<SignInResponse>('/signin', userData, { withCredentials: true })
  }
  getUser = () => {
    return this.api.get('/user', { withCredentials: true })
  }
}

type SignInData = {
  username: string
  password: string
}

type SignInResponse = string

export default AuthService
