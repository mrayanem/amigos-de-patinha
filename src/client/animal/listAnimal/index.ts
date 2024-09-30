import { api } from '@/client'
import { AnimalList } from '../types'
import { useQuery } from 'react-query'

async function listAnimals(): Promise<AnimalList> {
  return api.get('/animals').then((res) => res.data)
}

export function useListAnimals() {
  const {
    data: animals,
    error,
    isLoading,
    ...rest
  } = useQuery('animals', listAnimals)

  return {
    animals,
    error,
    isLoading,
    ...rest,
  }
}
