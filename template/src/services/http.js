import axios from 'axios'
import Base64 from './../utils/utils'
import { getCurrentUser } from './user'
import { base_url } from '../utils/api_url'

const backendURL = base_url

const ClientName = ''
const ClientPassword = ''
const basicCreds = Base64.btoa(ClientName + ':' + ClientPassword)
const currentUser = async () => {
  let data = await getCurrentUser()
  if (data) {
    return data?.user?.token
  }
}

const main_handler = () => {
  const responseHandler = response => {
    console.log(
      '*********************** HTTP RESPONSE START ***********************'
    )
    console.log('')
    console.log('')
    console.log('')
    console.log(' log request here', response)
    console.log('')
    console.log('')
    console.log('')
    console.log(
      '*********************** HTTP RESPONSE BODY ***********************'
    )
    console.log('')
    console.log('')
    console.log('')
    console.log(' log request here response.data', response.data)
    console.log('')
    console.log('')
    console.log('')
    console.log(
      '*********************** HTTP RESPONSE END ***********************'
    )
    if (response?.data?.status == 200) {
      return response
    } else {
      return response
    }
  }

  const handleError = async error => {
    console.log(
      '*********************** HTTP Response Error START ***********************'
    )
    console.log('')
    console.log('')
    console.log('')
    console.log(' Response Error Here', error?.message)
    console.log('')
    console.log('')
    console.log('')
    console.log(
      '*********************** HTTP Response Error END ***********************'
    )

    if (!error?.response && error?.message == 'Network Error') {
      alert('Please Check Your Internet Connection.')
      throw error
    } else if (error?.response?.status == 500) {
      alert('Internal Server Error.')
      throw error.response
    } else {
      console.log('error', error?.response)
      throw error.response
    }
  }
  const instance = axios.create({
    baseURL: backendURL
  })
  instance.interceptors.request.use(async config => {
    console.log(
      '*********************** SENDING HTTP REQUEST START ***********************'
    )
    console.log('')
    console.log('')
    console.log('')
    console.log(' log request here', config)
    console.log('')
    console.log('')
    console.log('')
    console.log(
      '*********************** ENDING HTTP REQUEST END ***********************'
    )
    let token = null
    switch (config.url) {
      case '/auth/signIn':
      case '/auth/signUp':
      case '/states':
        token = await currentUser()
        config.headers = {
          ...config.headers,
          Authorization: token ? 'Bearer ' + token : 'Basic ' + basicCreds,
          'Content-Type': 'application/json'
        }
        break
      default:
        token = await currentUser()
        config.headers = {
          ...config.headers,
          Authorization: 'Bearer ' + token
        }
    }
    return config
  })

  instance.interceptors.response.use(
    response => responseHandler(response),
    error => handleError(error)
  )

  return instance
}

export { main_handler, basicCreds }
