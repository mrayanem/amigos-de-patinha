'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Command } from 'lucide-react'
import Link from 'next/link'
import AnimalsTable from './table'

export function AnimalsDashboard() {
  return (
    <section className="flex h-screen items-center justify-center px-[5px] py-[8px]">
      <div className="h-full w-full rounded-[16px] border border-[#E1E7EF] bg-white p-[20px] shadow-md">
        <div className="flex flex-col">
          <span className="text-md mb-5 font-medium text-[#A0A0A9]">
            Animais
          </span>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-semibold tracking-tighter text-black">
              Animais
            </h1>
            <Link href={'/cadastro-pet'} className="h-auto">
              <Button className="text-md h-[50px] w-[260px] rounded-[16px] bg-[#01377D] text-white hover:bg-[#01377dc3]">
                Novo animal / <Command size={14} />
                <span className="text-sm">+ S</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="my-4 h-[2px] w-full bg-zinc-100" />

        <AnimalsTable />
      </div>
    </section>
  )
}
