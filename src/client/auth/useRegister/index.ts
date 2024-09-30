import { api } from '@/client'
import { CreateUser } from '../types'
import { useMutation } from 'react-query'

async function postUser(payload: CreateUser) {
  return api.post('/register', payload).then((res) => res.data)
}

export function useRegister() {
  const {
    data: createdUser,
    mutate: createUser,
    ...rest
  } = useMutation({
    mutationFn: postUser,
  })

  return {
    createdUser,
    createUser,
    ...rest,
  }
}
