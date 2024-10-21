'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { api } from '@/client'
import Link from 'next/link'

interface Animal {
  id: string
  name: string
  state: string
  city: string
  sex: string
  specie: string
  vetCare: string
  sociableWith: string
  livesWellIn: string
  animalSize: string
  description: string
  photoAnimal: string
  created_at: string
}

export default function AdoptionSection() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const animalsPerPage = 8

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/animals')
        setAnimals(response.data)
      } catch (error) {
        console.error('Erro ao buscar animais:', error)
      }
    }
    fetchAnimals()
  }, [])

  const indexOfLastAnimal = currentPage * animalsPerPage
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage
  const currentAnimals = animals.slice(indexOfFirstAnimal, indexOfLastAnimal)

  const totalPages = Math.ceil(animals.length / animalsPerPage)

  return (
    <section className="flex h-screen w-full flex-col">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-center px-5">
        <div className="flex flex-col items-start justify-start py-10 text-left">
          <h1 className="text-2xl font-bold text-[#01377D]">
            Encontre seu melhor amigo aqui!
          </h1>
        </div>

        <div className="flex w-full flex-row items-center gap-16 rounded-[10px] border-2 border-[#01377D] bg-transparent p-10">
          <Select>
            <SelectTrigger className="w-full border border-[#01377D] bg-transparent">
              <SelectValue placeholder="Todas as espécies" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-md flex flex-row items-center text-[#4F4747]">
                  Todas as espécies <ChevronDown size={18} />{' '}
                </SelectLabel>
                <SelectItem value="GATO">Gato</SelectItem>
                <SelectItem value="CACHORRO">Cachorro</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full border border-[#01377D] bg-transparent">
              <SelectValue placeholder="Todos os sexos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-md flex flex-row items-center text-[#4F4747]">
                  Todos os sexos <ChevronDown size={18} />{' '}
                </SelectLabel>
                <SelectItem value="MACHO">Macho</SelectItem>
                <SelectItem value="FEMEA">Fêmea</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full border border-[#01377D] bg-transparent">
              <SelectValue placeholder="Todos os portes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-md flex flex-row items-center text-[#4F4747]">
                  Todos os portes <ChevronDown size={18} />{' '}
                </SelectLabel>
                <SelectItem value="PEQUENO">Pequeno</SelectItem>
                <SelectItem value="MEDIO">Médio</SelectItem>
                <SelectItem value="GRANDE">Grande</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="w-full bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452]">
            Pesquisar
          </Button>
        </div>

        <div className="grid grid-cols-4 items-center justify-center gap-5 py-12">
          {currentAnimals.map((animal) => (
            <Link
              key={animal.id}
              className="w-full"
              href={`/adoption/${animal.id}`}
            >
              <div className="flex h-[292px] w-[250px] flex-col rounded-[10px] border border-[#615e5e43] shadow-2xl hover:scale-105">
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
            </Link>
          ))}
        </div>

        {/* Adicionando espaçamento antes da paginação */}
        <div className="py-5" />

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}
