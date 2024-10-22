import { nextAuthOptions } from '@/app/api/auth/authOptions'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

apiServer.interceptors.request.use(async (config) => {
  const session = await getServerSession(nextAuthOptions)
  config.headers.Authorization = `Bearer ${session?.user.token}`

  return config
})
