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

// Definindo a interface para o usuário
interface User {
  id: string
  name: string
  email: string
  status: boolean
  createdAt: string // Supondo que você tenha uma data de criação
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const itemsPerPage = 3 // Alterado para 3 usuários por página

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response.data)
      setFilteredUsers(response.data) // Inicialmente, todos os usuários são filtrados
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      toast.error('Erro ao buscar usuários.')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])


  useEffect(() => {
    const filtered = users.filter((user) => {
      const userDate = new Date(user.createdAt)
      const isDateMatch = selectedDate
        ? userDate.toDateString() === selectedDate.toDateString()
        : true

      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        isDateMatch
      )
    })

    setFilteredUsers(filtered)
    setCurrentPage(1) // Reseta a página para 1 quando o filtro é aplicado
  }, [searchTerm, selectedDate, users])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const currentUsers = filteredUsers.slice(
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
          <TableCaption>Lista de usuários.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID do Usuário</TableHead>
              <TableHead>Nome do Usuário</TableHead>
              <TableHead>Email do Usuário</TableHead>
              <TableHead>Status do Usuário</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-xs font-normal">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status ? 'ativo' : 'inativo'}</TableCell>
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
                        onClick={() => copyToClipboard(user.id)}
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
