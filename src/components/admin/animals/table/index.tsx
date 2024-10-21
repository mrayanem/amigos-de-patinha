'use client'

import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CalendarDays, ChevronsDownUp, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { api } from '@/client'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import Image from 'next/image'

// Definindo a interface para o animal
interface Animal {
  id: string
  name: string
  user: string
  status: boolean
  createdAt: string
  photoAnimal: string
}

export default function AnimalsTable() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const itemsPerPage = 3

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/animals')
        setAnimals(response.data)
        setFilteredAnimals(response.data)
      } catch (error) {
        console.error('Erro ao buscar animais:', error)
        toast.error('Erro ao buscar animais.')
      }
    }
    fetchAnimals()
  }, [])

  useEffect(() => {
    const filtered = animals.filter((animal) => {
      const animalDate = new Date(animal.createdAt)
      const isDateMatch = selectedDate
        ? animalDate.toDateString() === selectedDate.toDateString()
        : true

      return (
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        isDateMatch
      )
    })

    setFilteredAnimals(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedDate, animals])

  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage)

  const currentAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success(`ID copiado para a área de transferência!`, {
      theme: 'colored',
    })
  }

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[251px] max-w-sm border border-[#E4E4E7] shadow-sm placeholder:text-[#71717A]"
          />
        </div>
        <div className="flex items-center space-x-2 rounded-[16px] border border-[#E4E4E7] p-2 shadow-md">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#F9F9F9]">
            <CalendarDays className="text-[#01377D]" />
          </div>
          <div className="flex flex-1 flex-col truncate">
            <span className="truncate text-[10px] font-medium text-zinc-500">
              Filtro
            </span>
            <span className="text-lg font-medium text-black">
              {selectedDate ? format(selectedDate, 'PPP') : 'Selecionar Data'}
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="ml-auto rounded-md p-2 hover:bg-zinc-50"
              >
                <ChevronsDownUp className="h-5 w-5 text-zinc-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Table>
          <TableCaption>Lista de animais.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Foto do Animal</TableHead>
              <TableHead>Nome do Animal</TableHead>
              <TableHead>ID do Doador</TableHead>
              <TableHead>Status do Animal</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAnimals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell className="text-xs font-normal">
                  <Image
                    src={animal.photoAnimal}
                    alt={animal.name}
                    width={40}
                    height={40}
                    className="rounded-[5px] object-cover"
                  />
                </TableCell>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.user}</TableCell>
                <TableCell>
                  {animal.status ? 'para doação' : 'adotado'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="border border-zinc-200 p-2"
                      >
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Opções</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => copyToClipboard(animal.id)}
                      >
                        Copiar ID
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
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
                  setCurrentPage(
                    currentPage < totalPages ? currentPage + 1 : totalPages,
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <ToastContainer />
    </>
  )
}
