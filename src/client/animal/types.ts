export type CreateAnimal = {
  name: string
  sex: string
  age: number
  animalSize: string
  state: string
  city: string
  description: string
  photoAnimal: File
  specie: 'GATO' | 'CACHORRO'
}

export type AnimalList = CreateAnimal[]
