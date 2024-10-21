import { api } from '@/client'
import { CreateAnimal } from '../types'
import { useMutation } from 'react-query'

async function postAnimal({ photoAnimal, ...rest }: CreateAnimal) {
  const data = JSON.stringify({ ...rest })
  console.log(data)
  const response = await api.postForm('/animals', {
    photoAnimal: photoAnimal[0],
    data,
  })
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
