import { api } from '@/client'
import { CreateAnimal } from '../types'
import { useMutation } from 'react-query'

async function postAnimal(payload: CreateAnimal) {
  return api.post('/animals', payload).then((res) => res.data)
}

export function useCreateAnimal() {
  const {
    data: createdAnimal,
    mutate: createAnimal,
    ...rest
  } = useMutation({
    mutationFn: postAnimal,
  })

  return {
    createdAnimal,
    createAnimal,
    ...rest,
  }
}
