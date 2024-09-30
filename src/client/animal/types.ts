export type CreateAnimal = {
  name: string
  sex: string
  age: number
  animalSize: string
  state: string
  city: string
  description?: string
  photoAnimal: string
  specieId: string
}

export type AnimalList = CreateAnimal[]
