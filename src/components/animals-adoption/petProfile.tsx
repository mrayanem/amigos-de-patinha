'use client'

import { FaUserAlt } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { api } from '@/client'
import { toast } from 'react-toastify'
import { useParams, useSearchParams } from 'next/navigation'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { ModalPet } from './petModal'

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

export default function AdoptionDetails({
  params,
}: {
  params: { id: string }
}) {
  const [isMounted, setIsMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [animal, setAnimal] = useState<Animal | null>(null)
  const { id } = useParams()
  console.log(params)
  useEffect(() => {
    console.log('ID do animal:', params.id) // Verifica o ID

    const fetchAnimal = async () => {
      if (!id) {
        toast.error('ID do animal não encontrado.')
        return
      }

      try {
        const response = await api.get(`/animal/${id}`)
        if (response.data) {
          setAnimal(response.data)
        } else {
          toast.error('Animal não encontrado.')
        }
      } catch (error) {
        console.error('Erro ao buscar animal:', error)
        toast.error('Erro ao buscar animal. Tente novamente mais tarde.')
      }
    }

    fetchAnimal()
  }, [id]) // O useEffect depende do ID

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  if (!animal) return <p>Carregando...</p>

  return (
    <>
      <section className="flex h-screen w-full flex-col items-center justify-center">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center">
          <div className="grid w-full grid-cols-2 items-center justify-center gap-10 rounded-[10px] p-20">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={'https://utfs.io/f/' + animal.photoAnimal}
                className="rounded-[8px]"
                alt={animal.name}
                width={400}
                height={400}
              />
            </div>
            <div className="flex w-full flex-col text-left">
              <div className="flex flex-col">
                <span className="pb-1 text-2xl font-bold text-[#01377D]">
                  {animal.name}
                </span>
                <div className="flex flex-row gap-2 pb-4 text-sm text-[#4F4747]">
                  <span>{animal.specie}</span> <span>|</span>
                  <span>{animal.sex}</span> <span>|</span>
                  <span>{animal.animalSize}</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 pb-4">
                <span className="flex flex-row gap-2 text-sm text-[#4F4747]">
                  <MapPin className="text-[#7FD349]" size={20} />
                  Está em {animal.city}, {animal.state}
                </span>
                <span className="flex flex-row gap-2 text-sm text-[#4F4747]">
                  <FaUserAlt className="text-[#7FD349]" size={20} />
                  Publicado em {formatDate(animal.created_at)}
                </span>
              </div>
              <Button
                onClick={() => setShowModal(true)}
                className="my-5 w-full rounded-[10px] border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]"
              >
                Entrar em contato
              </Button>
              <div className="pb-4">
                <span className="text-xl font-bold text-[#7FD349]">
                  História do {animal.name}
                </span>
                <p className="mt-2 text-sm text-[#4F4747]">
                  {animal.description}
                </p>
              </div>
              <div className="mb-10">
                <span className="text-xl font-bold text-[#7FD349]">
                  Mais detalhes sobre {animal.name}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                    {animal.vetCare}
                  </Badge>
                  <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                    {animal.sociableWith}
                  </Badge>
                  <Badge className="rounded-[10px] bg-[#B3C3D8] p-2 text-[#01377D] hover:bg-[#B3C3D8]">
                    {animal.livesWellIn}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => setShowModal(true)}
                className="w-full rounded-[10px] border bg-[#01377D] text-lg text-white hover:bg-[#01377d97]"
              >
                Quero adotar
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-xl border border-zinc-50 bg-white shadow-md">
          <div className="min-h-[280px] w-full">
            <ModalPet {...animal.user} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
