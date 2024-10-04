'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { api } from '@/client'
import axios from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { getSession } from 'next-auth/react'

interface User {
  id: string
  name: string
  email: string
  telephone: string
  state: string
  city: string
}

const fetchUserData = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`)
    if (!response.data) {
      throw new Error('Erro ao buscar dados do usuário')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message
      toast.error('Erro ao buscar dados do usuário: ' + errorMessage)
      throw new Error(errorMessage)
    } else {
      toast.error('Erro inesperado ao buscar dados do usuário')
      throw new Error('Erro inesperado')
    }
  }
}

const updateUserData = async ({ id, ...rest }: User) => {
  try {
    const response = await api.patch(`/user/${id}`, rest)
    if (!response.data) {
      throw new Error('Erro ao atualizar dados do usuário')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message
      toast.error('Erro ao atualizar dados do usuário: ' + errorMessage)
      throw new Error(errorMessage)
    } else {
      toast.error('Erro inesperado ao atualizar dados do usuário')
      throw new Error('Erro inesperado')
    }
  }
}

// eslint-disable-next-line @next/next/no-async-client-component
export default function ProfileDetails() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const session = await getSession()
        if (session?.user.id) {
          const data = await fetchUserData(session?.user.id)
          setUser(data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadUserData()
  }, [])

  const mutation = useMutation({
    mutationFn: (userData: User) => updateUserData(userData),
    onError: (error: any) => {
      toast.error(
        'Erro ao atualizar dados: ' + (error.message || 'Erro desconhecido'),
      )
    },
    onSuccess: (data) => {
      setUser(data)
      toast.success('Dados atualizados com sucesso!')
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User,
  ) => {
    if (user) {
      setUser({ ...user, [field]: e.target.value })
    }
  }

  const onSubmit = () => {
    if (user) {
      mutation.mutate(user)
    }
  }

  if (!user) return <p>Carregando...</p>

  return (
    <section className="flex h-screen items-center justify-center bg-zinc-100 px-4 pb-10">
      <div className="mx-auto flex w-[1200px] flex-col rounded-[10px] bg-white px-10 py-20">
        <div className="grid w-full grid-cols-2 gap-5">
          <div className="flex items-center justify-center">
            <Image
              src="/profile-user.svg"
              className="rounded-[8px]"
              alt="profile"
              width={350}
              height={350}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center gap-x-14 pb-5">
              <p className="text-lg font-light text-black">Nome:</p>
              <Input
                className="w-[300px] rounded-[5px] border border-none bg-[#F5F5F5] font-normal text-[#A2A7A9]"
                value={user.name}
                onChange={(e) => handleChange(e, 'name')}
                placeholder="Nome"
              />
            </div>

            <div className="flex flex-row items-center gap-x-12 pb-5">
              <p className="text-lg font-light text-black">E-mail:</p>
              <Input
                className="w-[300px] rounded-[5px] border border-none bg-[#F5F5F5] font-normal text-[#A2A7A9]"
                value={user.email}
                onChange={(e) => handleChange(e, 'email')}
                placeholder="E-mail"
              />
            </div>

            <div className="flex flex-row items-center gap-x-9 pb-5">
              <p className="text-lg font-light text-black">Telefone:</p>
              <Input
                className="w-[300px] rounded-[5px] border border-none bg-[#F5F5F5] font-normal text-[#A2A7A9]"
                value={user.telephone}
                onChange={(e) => handleChange(e, 'telephone')}
                placeholder="Telefone"
              />
            </div>

            <div className="flex flex-row items-center gap-x-6 pb-10">
              <p className="text-lg font-light text-black">Endereço:</p>
              <Input
                className="w-[300px] rounded-[5px] border border-none bg-[#F5F5F5] font-normal text-[#A2A7A9]"
                value={`${user.city}, ${user.state}`}
                onChange={(e) => {
                  const [city, state] = e.target.value.split(', ')
                  handleChange({ target: { value: city } }, 'city')
                  setUser({ ...user, state }) // Atualiza o estado separadamente
                }}
                placeholder="Cidade, Estado"
              />
            </div>

            <div className="flex flex-row gap-x-4">
              <Button
                className="w-[200px] border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]"
                onClick={onSubmit}
              >
                Salvar
              </Button>
              <Button className="w-[200px] border border-[#01377D] bg-transparent text-lg text-[#01377D] hover:border-[#01377d97] hover:bg-transparent">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
