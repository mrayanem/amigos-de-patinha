'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useState } from 'react'
import { Badge } from '../ui/badge'
import { FaUserAlt } from 'react-icons/fa'
import { MapPin, Pen } from 'lucide-react'
import Link from 'next/link'

export default function ProfileAnimal() {
  const [currentPage, setCurrentPage] = useState(1)
  const animalsPerPage = 1

  const indexOfLastAnimal = currentPage * animalsPerPage
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage
  // const currentAnimals = animals.slice(indexOfFirstAnimal, indexOfLastAnimal)

  // const totalPages = Math.ceil(animals.length / animalsPerPage)

  return (
    <section className="flex h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="mx-auto flex w-[1200px] flex-col">
        <div className="flex flex-col justify-start pb-5">
          <h2>Meus animais</h2>
        </div>
        {/* {currentAnimals.map((animal) => ( */}
        <div
          // key={animal.id}
          className="grid w-full grid-cols-2 rounded-[10px] border border-zinc-50 bg-white p-20 shadow-md"
        >
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/grid-home/gato1.png"
              className="rounded-[8px]"
              alt="animal"
              width={350}
              height={350}
            />
          </div>

          <div className="flex w-full flex-col text-left">
            <div className="flex flex-col">
              <span className="pb-1 text-2xl font-bold text-[#01377D]">
                Neneco
              </span>
              <div className="flex flex-row gap-2 pb-4 text-sm text-[#4F4747]">
                <span>Gato</span> <span>|</span>
                <span>Macho</span> <span>|</span>
                <span>Pequeno porte</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 pb-4">
              <span className="flex flex-row gap-2 text-sm text-[#4F4747]">
                <MapPin className="text-[#7FD349]" size={20} />
                Está em Barueri, São Paulo
              </span>
              <span className="flex flex-row gap-2 text-sm text-[#4F4747]">
                <FaUserAlt className="text-[#7FD349]" size={20} />
                Publicado por{' '}
                <span className="text-[#7FD349]">Fulano de Tal</span> em
                15/10/2024
              </span>
            </div>
            <div className="pb-4">
              <span className="pb-2 text-xl font-bold text-[#7FD349]">
                História do Neneco
              </span>
              <p className="text-sm text-[#4F4747]">
                Zeca é um gato jovem, de aproximadamente 1 ano, cheio de energia
                e carisma. Resgatado das ruas, ele está em busca de um lar
                amoroso para chamar de seu. Castrado, vacinado e saudável, Zeca
                é um companheiro brincalhão e afetuoso, pronto para alegrar a
                vida de sua futura família. Se você está pronto para receber
                amor incondicional, Zeca está pronto para conquistar seu
                coração.
              </p>
            </div>
            <div className="mb-10">
              <span className="pb-2 text-xl font-bold text-[#7FD349]">
                Mais detalhes sobre o Neneco
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                  Apartamento
                </Badge>{' '}
                <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                  Casa
                </Badge>
                <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#b3c3d8d0]">
                  Crianças
                </Badge>{' '}
                <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                  Castrado
                </Badge>
              </div>
            </div>
            <div className="flex w-full flex-row gap-x-4">
              <Link className="w-full" href="/animals-details">
                <Button className="w-full border border-[#01377D] bg-transparent text-lg text-[#01377D] hover:border-[#01377d97] hover:bg-transparent hover:text-[#01377d97]">
                  <Pen size={16} /> <span className="pl-2">Editar</span>
                </Button>
              </Link>
              <Button className="w-full border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]">
                Adotado
              </Button>
            </div>
          </div>
        </div>
        {/* ))} */}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                // onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                // disabled={currentPage === 1}
              />
            </PaginationItem>
            {/* {Array.from({ length: totalPages }, (_, index) => ( */}
            <PaginationItem
            // key={index + 1}
            >
              <PaginationLink
                href="#"
                // isActive={currentPage === index + 1}
                // onClick={() => setCurrentPage(index + 1)}
              >
                {/* {index + 1} */}
              </PaginationLink>
            </PaginationItem>
            {/* ))} */}
            <PaginationItem>
              <PaginationNext
                href="#"
                // onClick={() =>
                //   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                // }
                // disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}
