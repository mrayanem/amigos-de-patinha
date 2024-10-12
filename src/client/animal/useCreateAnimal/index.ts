import { api } from '@/client'
import { CreateAnimal } from '../types'
import { useMutation } from 'react-query'

async function postAnimal(payload: CreateAnimal) {
  const response = await api.post('/animals', payload)
  return response.data
}

export function useCreateAnimal() {
  const {
    data: createdAnimal,
    mutate: createAnimal,
    isLoading,
    isError,
    error,
    ...rest
  } = useMutation({
    mutationFn: postAnimal,
  })

  return {
    createdAnimal,
    createAnimal,
    isLoading,
    isError,
    error,
    ...rest,
  }
}
