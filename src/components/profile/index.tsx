'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Pen } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { api } from '@/client'

interface User {
  name: string
  email: string
  telephone: string
  state: string
  city: string
}

const fetchUserData = async (userId: string) => {
  const response = await api(`/user/${userId}`)
  if (!response.data) {
    throw new Error('Erro ao buscar dados do usuário')
  }
  return response.data
}

export default function Profile() {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User, Error>(['user', userId], () => fetchUserData(userId!), {
    enabled: !!userId,
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro ao carregar os dados do usuário: {error.message}</div>
  }

  if (!user) {
    return <div>Nenhum dado do usuário encontrado.</div>
  }

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
            <div className="flex flex-col pb-5">
              <p className="text-lg font-light text-black">Nome:</p>
              <span className="font-normal text-[#50585c7e]">{user.name}</span>
            </div>

            <div className="flex flex-col pb-5">
              <p className="text-lg font-light text-black">E-mail:</p>
              <span className="font-normal text-[#50585c7e]">{user.email}</span>
            </div>

            <div className="flex flex-col pb-5">
              <p className="text-lg font-light text-black">Telefone:</p>
              <span className="font-normal text-[#50585c7e]">
                {user.telephone}
              </span>
            </div>

            <div className="flex flex-col pb-5">
              <p className="text-lg font-light text-black">Endereço:</p>
              <span className="font-normal text-[#50585c7e]">
                {user.city}, {user.state}
              </span>
            </div>

            <Link href="/profile-details">
              <Button className="w-[220px] border border-[#01377D] bg-transparent text-lg text-[#01377D] hover:border-[#01377d97] hover:bg-transparent hover:text-[#01377d97]">
                <Pen size={16} /> <span className="pl-2">Editar</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
