import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'

export default function AdoptionSection() {
  return (
    <>
      <section className="flex h-screen w-full flex-col">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-center">
          <div className="flex flex-col items-start justify-start py-10 text-left">
            <h1 className="text-2xl font-bold text-[#01377D]">
              Encontre seu melhor amigo aqui!
            </h1>
          </div>

          <div className="flex w-full flex-row items-center gap-16 rounded-[10px] border-2 border-[#01377D] bg-transparent p-10">
            <Select>
              <SelectTrigger className="w-full border border-[#01377D] bg-transparent">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-md flex flex-row items-center text-[#4F4747]">
                    Todas as espécies <ChevronDown size={18} />{' '}
                  </SelectLabel>
                  <SelectItem value="GATO">Gato</SelectItem>
                  <SelectItem value="CACHORRO">Cachorro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full border border-[#01377D] bg-transparent">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-md flex flex-row items-center text-[#4F4747]">
                    Todas as espécies <ChevronDown size={18} />{' '}
                  </SelectLabel>
                  <SelectItem value="GATO">Gato</SelectItem>
                  <SelectItem value="CACHORRO">Cachorro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full border border-[#01377D] bg-transparent">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-md flex flex-row items-center text-[#4F4747]">
                    Todas as espécies <ChevronDown size={18} />{' '}
                  </SelectLabel>
                  <SelectItem value="GATO">Gato</SelectItem>
                  <SelectItem value="CACHORRO">Cachorro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="w-full bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452]">
              Pesquisar
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
