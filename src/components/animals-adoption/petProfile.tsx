import { FaUserAlt } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { MapPin, Pen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function AdoptionDetails() {
  return (
    <>
      <section className="flex h-screen w-full flex-col items-center justify-center self-center">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center">
          <div className="grid w-full grid-cols-2 rounded-[10px] p-20">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/grid-home/gato1.png"
                className="rounded-[8px]"
                alt="animal"
                width={400}
                height={400}
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
              <Button className="my-5 w-full rounded-[10px] border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]">
                Entrar em contato
              </Button>
              <div className="pb-4">
                <span className="text-xl font-bold text-[#7FD349]">
                  História do Neneco
                </span>
                <p className="mt-2 text-sm text-[#4F4747]">
                  Zeca é um gato jovem, de aproximadamente 1 ano, cheio de
                  energia e carisma. Resgatado das ruas, ele está em busca de um
                  lar amoroso para chamar de seu. Castrado, vacinado e saudável,
                  Zeca é um companheiro brincalhão e afetuoso, pronto para
                  alegrar a vida de sua futura família. Se você está pronto para
                  receber amor incondicional, Zeca está pronto para conquistar
                  seu coração.
                </p>
              </div>
              <div className="mb-10">
                <span className="text-xl font-bold text-[#7FD349]">
                  Mais detalhes sobre o Neneco
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
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
              <Button className="w-full rounded-[10px] border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]">
                Quero adotar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
