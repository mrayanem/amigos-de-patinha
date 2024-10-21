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
import { Textarea } from '../ui/textarea'
import { api } from '@/client'

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

export default function ProfileAnimal() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const animalsPerPage = 1
  const [editedDescription, setEditedDescription] = useState<string>('')

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/animals')
        setAnimals(response.data)
        if (response.data.length > 0) {
          setEditedDescription(response.data[0].description) // Set initial description for editing
        }
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

  const handleSave = async (animalId: string) => {
    try {
      await api.patch(`/animals/${animalId}`, {
        description: editedDescription,
      })
      alert('Descrição atualizada com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar descrição:', error)
    }
  }

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Mês começa em 0
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
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
                  <span className="text-[#7FD349]">Fulano de Tal</span> em{' '}
                  {formatDate(animal.created_at)}
                </span>
              </div>
              <div className="pb-4">
                <span className="text-xl font-bold text-[#7FD349]">
                  História do {animal.name}
                </span>
                <Textarea
                  className="mt-2 h-[150px] w-full rounded-[5px] border border-none bg-[#F5F5F5] text-sm font-normal text-[#A2A7A9]"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
              <div className="mb-10">
                <span className="pb-2 text-xl font-bold text-[#7FD349]">
                  Mais detalhes sobre o {animal.name}
                </span>
                <div className="flex flex-wrap gap-2">
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
                <Button
                  className="w-full border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]"
                  onClick={() => handleSave(animal.id)}
                >
                  Salvar
                </Button>
                <Link className="w-full" href="/animals-details">
                  <Button className="w-full border border-[#01377D] bg-transparent text-lg text-[#01377D] hover:border-[#01377d97] hover:bg-transparent hover:text-[#01377d97]">
                    <Pen size={16} /> <span className="pl-2">Editar</span>
                  </Button>
                </Link>
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
