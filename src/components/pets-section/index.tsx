'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { api } from '@/client'

interface Animal {
  id: string
  name: string
  state: string
  city: string
  photoAnimal: string
  status: boolean
}

export default function PetsHome() {
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/animals')
        const filteredAnimals = response.data.filter((animal: Animal) => animal.status === true)
        setAnimals(filteredAnimals)
      } catch (error) {
        console.error('Erro ao buscar animais:', error)
      }
    }
    fetchAnimals()
  }, [])

  return (
    <>
      <section className="px-4 pb-10 pt-10 md:pb-20">
        <div className="mx-auto flex max-w-[1200px] flex-col">
          <div className="flex flex-col items-start justify-start text-left">
            <h2 className="text-[40px] font-semibold text-[#01377D]">
              Encontre seu melhor amigo aqui!
            </h2>
            <span className="text-xl font-normal text-black">
              Aqui, você encontrará gatinhos e cachorrinhos à espera de um lar.
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4 py-16">
            {animals.slice(0, 8).map((animal) => (
              <div
                key={animal.id}
                className="flex h-[292px] w-[250px] flex-col rounded-[10px] border border-[#615e5e43] shadow-2xl"
              >
                <div className="relative h-[226px] w-full overflow-hidden rounded-t-[10px]">
                  <Image
                    priority
                    fill
                    style={{ objectFit: 'cover' }}
                    alt={animal.name}
                    src={animal.photoAnimal}
                  />
                </div>
                <div className="flex flex-col p-2">
                  <span className="text-lg font-semibold text-[#01377D]">
                    {animal.name}
                  </span>
                  <span>{`${animal.city}, ${animal.state}`}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="h-[50px] w-[190px] rounded-[17px] bg-[#01377D] text-xl font-medium text-white">
              Ver mais
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
