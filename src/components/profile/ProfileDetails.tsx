import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Pen } from 'lucide-react'

export default function ProfileDetails() {
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
                placeholder="nome usuarios"
              />
            </div>

            <div className="flex flex-row items-center gap-x-12 pb-5">
              <p className="text-lg font-light text-black">e-mail:</p>
              <Input
                className="w-[300px] rounded-[5px] border border-none bg-[#F5F5F5] font-normal text-[#A2A7A9]"
                placeholder="fulano@gmail.com"
              />
            </div>

            <div className="flex flex-row items-center gap-x-9 pb-5">
              <p className="text-lg font-light text-black">telefone:</p>
              <Input
                className="w-[300px] rounded-[5px] border border-none bg-[#F5F5F5] font-normal text-[#A2A7A9]"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="flex flex-row items-center gap-x-6 pb-10">
              <p className="text-lg font-light text-black">endereço:</p>
              <Input
                className="w-[300px] rounded-[5px] border border-none bg-[#F5F5F5] font-normal text-[#A2A7A9]"
                placeholder="Cotia, São Paulo"
              />
            </div>

            <div className="flex flex-row gap-x-4">
              <Button className="w-[200px] border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]">
                salvar
              </Button>
              <Button className="w-[200px] border border-[#01377D] bg-transparent text-lg text-[#01377D] hover:border-[#01377d97] hover:bg-transparent hover:text-[#01377d97]">
                cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <section />
    </section>
  )
}
