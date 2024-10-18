import { api } from '@/client'
import { CreateAnimal } from '../types'
import { useMutation } from 'react-query'

async function postAnimal(payload: CreateAnimal) {
  console.log(payload)
  // const response = await api.postForm('/animals', payload)
  // return response.data
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
