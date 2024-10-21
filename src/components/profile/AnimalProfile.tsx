'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { FaUserAlt } from 'react-icons/fa'
import { MapPin, Pen } from 'lucide-react'
import Link from 'next/link'
import { api } from '@/client'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
}

export default function ProfileAnimal() {
  const { data: session } = useSession()
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/animals-user/' + session?.user.id)
        setAnimals(response.data)
      } catch (error) {
        console.error('Erro ao buscar animais:', error)
      }
    }
    if (session?.user.id) fetchAnimals()
  }, [session?.user])

  const [currentPage, setCurrentPage] = useState(1)
  const animalsPerPage = 1

  const indexOfLastAnimal = currentPage * animalsPerPage
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage
  const currentAnimals = animals.slice(indexOfFirstAnimal, indexOfLastAnimal)

  const totalPages = Math.ceil(animals.length / animalsPerPage)

  const [adoptedAnimals, setAdoptedAnimals] = useState<Set<string>>(new Set())

  const handleAdopt = async (animalId: string) => {
    if (adoptedAnimals.has(animalId)) {
      toast.warn('Este animal já foi adotado!')
      return
    }

    try {
      await api.delete("/animal/" + animalId)
      toast.success('Animal adotado com sucesso!')
      setAdoptedAnimals((prev) => new Set(prev).add(animalId))
    } catch (error) {
      toast.error('Erro ao adotar o animal.')
    }
  }

  return (
    <section className="flex h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col">
        <span className="pb-5 text-lg font-medium">Meus animais</span>
        {currentAnimals.map((animal) => (
          <div
            key={animal.id}
            className="mb-5 grid w-full grid-cols-1 rounded-[10px] border border-zinc-50 bg-white p-5 shadow-md md:grid-cols-2 md:p-10"
          >
            <div className="flex items-center justify-center">
              <Image
                src={animal.photoAnimal}
                className="rounded-[8px]"
                alt={animal.name}
                width={350}
                height={350}
              />
            </div>

            <div className="flex flex-col p-4 text-left">
              <span className="pb-1 text-2xl font-bold text-[#01377D]">
                {animal.name}
              </span>
              <div className="flex flex-row gap-2 pb-4 text-sm text-[#4F4747]">
                <span>{animal.specie}</span> <span>|</span>
                <span>{animal.sex}</span> <span>|</span>
                <span>{animal.animalSize}</span>
              </div>
              <div className="flex flex-col gap-y-2 pb-4">
                <span className="flex flex-row gap-2 text-sm text-[#4F4747]">
                  <MapPin className="text-[#7FD349]" size={20} />
                  Está em {animal.city}
                </span>
                <span className="flex flex-row gap-2 text-sm text-[#4F4747]">
                  <FaUserAlt className="text-[#7FD349]" size={20} />
                  Publicado por{' '}
                  <span className="text-[#7FD349]">Fulano de Tal</span> em
                  15/10/2024
                </span>
              </div>
              <div className="pb-4">
                <span className="text-xl font-bold text-[#7FD349]">
                  História do {animal.name}
                </span>
                <p className="mt-2 text-sm text-[#4F4747]">
                  {animal.description}
                </p>
              </div>
              <div className="mb-10">
                <span className="pb-2 text-xl font-bold text-[#7FD349]">
                  Mais detalhes sobre o {animal.name}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                    {animal.livesWellIn}
                  </Badge>
                  <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                    {animal.sociableWith}
                  </Badge>
                  <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#b3c3d8d0]">
                    {animal.vetCare}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-x-4 md:flex-row">
                <Link className="w-full" href="/animals-details">
                  <Button className="w-full border border-[#01377D] bg-transparent text-lg text-[#01377D] hover:border-[#01377d97] hover:bg-transparent hover:text-[#01377d97]">
                    <Pen size={16} /> <span className="pl-2">Editar</span>
                  </Button>
                </Link>
                <Button onClick={() => handleAdopt(animal.id)} className="w-full border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]">
                  Adotado
                </Button>
              </div>
            </div>
          </div>
        ))}

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
