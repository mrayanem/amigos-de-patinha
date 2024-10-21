'use client'

import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'

export function ModalPet(props: { email: string; telephone: string }) {
  return (
    <div className="flex h-auto w-full flex-col justify-center p-10">
      <div className="mb-2 flex flex-row items-center gap-2">
        <Image
          src="/icon-talk.svg"
          className="object-contain"
          alt="talk"
          width={50}
          height={50}
        />
        <span className="text-2xl font-semibold">Quer adotar?</span>
      </div>
      <div className="mb-3 flex flex-col pl-14 text-lg font-medium">
        <p className="">
          Para adotar esse pet ou saber mais sobre ele, entre em contato com o
          protetor:
        </p>
      </div>
      <div className="flex flex-col pl-14 text-lg font-medium">
        <span className="flex flex-row items-center gap-2">
          <Mail size={20} className="text-[#7FD349]" /> {props.email}
        </span>
        <span className="flex flex-row items-center gap-2">
          <Phone size={20} className="text-[#7FD349]" /> {props.telephone}
        </span>
      </div>
    </div>
  )
}
