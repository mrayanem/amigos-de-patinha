import { api } from '@/client'
import { UserList } from '../types'
import { useQuery } from 'react-query'

async function listUsers(): Promise<UserList> {
  return api.get('/users').then((res) => res.data)
}

export function useListUsers() {
  const {
    data: users,
    error,
    isLoading,
    ...rest
  } = useQuery('users', listUsers)

  return {
    users,
    error,
    isLoading,
    ...rest,
  }
}
