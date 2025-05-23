'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FaHouseUser, FaPaw } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChangeEvent, useState } from 'react'
import { Image, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useCreateAnimal } from '@/client/animal'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const formSchema = z.object({
  name: z.string().nonempty('Insira o nome do pet'),
  sex: z.enum(['FEMEA', 'MACHO'], { required_error: 'Insira o sexo do pet' }),
  specie: z.enum(['GATO', 'CACHORRO'], {
    required_error: 'Insira a espécie do pet',
  }),
  age: z.string().transform((age) => parseInt(age)),
  city: z.string().nonempty('Insira sua cidade'),
  state: z.string().nonempty('Insira seu estado'),
  animalSize: z.enum(['PEQUENO', 'MEDIO', 'GRANDE'], {
    required_error: 'Insira o porte do pet',
  }),
  description: z.string().nonempty('Insira a descrição'),
  photoAnimal: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  livesWellIn: z.enum(['APARTAMENTO', 'CASA'], {
    required_error: 'Selecione uma opção para "Vive bem em"',
  }),
  sociableWith: z.enum(['OUTROS_ANIMAIS', 'CRIANCAS', 'DESCONHECIDOS'], {
    required_error: 'Selecione uma opção para "Sociável com"',
  }),
  vetCare: z.enum(['CASTRADO', 'VACINADO', 'VERMIFUGADO'], {
    required_error: 'Selecione uma opção para "Cuidados veterinários"',
  }),
})

export default function SectionCadastroPet() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const router = useRouter()
  const { createAnimal, isLoading } = useCreateAnimal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Valores do formulário:', values)
    try {
      await createAnimal(values)
      toast.success('Cadastro realizado com sucesso!')
      router.replace('/')
    } catch (error) {
      toast.error('Erro ao cadastrar o animal.')
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (file) {
      setSelectedImage(file[0])
      form.setValue('photoAnimal', file)
    }
  }

  return (
    <section className="bg-[#f7f4f4] px-4 py-10 md:py-[40px]">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center">
        <div className="flex h-auto w-full flex-col items-center justify-center self-center rounded-[20px] bg-white py-5 shadow-2xl md:h-auto">
          <div className="flex h-auto w-full max-w-[500px] flex-col items-center justify-center self-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-[50px] flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl font-bold text-[#01377D]">
                    Cadastre um animal para adoção
                  </h2>
                  <span className="text-md font-semibold text-[#A2A7A9]">
                    Necessitamos destas informações para prosseguir
                  </span>
                </div>
                <div className="mb-5 flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaPaw className="text-[#A2A7A9]" size={17} />
                        </span>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Nome do pet"
                          className="w-full rounded-[5px] border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <div className="grid w-full grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="specie"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                            <SelectValue placeholder="Espécie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="font-bold text-[#A2A7A9]">
                              <SelectItem value="GATO">Gato</SelectItem>
                              <SelectItem value="CACHORRO">Cachorro</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                            <SelectValue placeholder="Sexo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="font-bold text-[#A2A7A9]">
                              <SelectItem value="FEMEA">Fêmea</SelectItem>
                              <SelectItem value="MACHO">Macho</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaHouseUser className="text-[#A2A7A9]" size={17} />
                          </span>
                          <Input
                            type="text"
                            id="age"
                            placeholder="Idade"
                            className="w-full rounded-[5px] border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="animalSize"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                            <SelectValue placeholder="Porte" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="font-bold text-[#A2A7A9]">
                              <SelectItem value="PEQUENO">Pequeno</SelectItem>
                              <SelectItem value="MEDIO">Médio</SelectItem>
                              <SelectItem value="GRANDE">Grande</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaHouseUser className="text-[#A2A7A9]" size={17} />
                          </span>
                          <Input
                            type="text"
                            id="state"
                            placeholder="Estado"
                            className="w-full rounded-[5px] border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaHouseUser className="text-[#A2A7A9]" size={17} />
                          </span>
                          <Input
                            type="text"
                            id="city"
                            placeholder="Cidade"
                            className="w-full rounded-[5px] border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <Textarea
                            id="description"
                            placeholder="Descrição do animal"
                            className="h-[45px] w-full rounded-[5px] border-none bg-[#F5F5F5] font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div className="mb-5 flex flex-col">
                  <span className="text-sm font-semibold text-[#A2A7A9]">
                    Foto do pet
                  </span>
                  <div className="mt-2 flex w-full flex-col">
                    <FormField
                      control={form.control}
                      name="photoAnimal"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <label
                            htmlFor="photoAnimal"
                            className="absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <Image className="text-[#A2A7A9]" size={17} />
                          </label>
                          <input
                            type="file"
                            id="photoAnimal"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              handleImageChange(e)
                              field.onChange(e.target.files) // Atualiza o campo com o arquivo selecionado
                            }}
                          />
                          <Input
                            type="text"
                            value={selectedImage?.name} // Exibe o nome do arquivo selecionado
                            placeholder="Selecionar foto do pet"
                            className="w-full rounded-[5px] border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9] md:w-[250px]"
                            onClick={() =>
                              document.getElementById('photoAnimal')!.click()
                            }
                            readOnly
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="mb-5 flex flex-col gap-3">
                  <div className="mb-5 flex flex-col">
                    <div className="mb-2 flex flex-col items-center justify-center">
                      <span className="text-md font-semibold text-[#A2A7A9]">
                        Informações complementares
                      </span>
                    </div>
                    <div className="mb-5">
                      <span className="text-sm font-semibold text-[#A2A7A9]">
                        Vive bem em
                      </span>
                      <FormField
                        control={form.control}
                        name="livesWellIn"
                        render={({ field }) => (
                          <div className="relative mt-2 w-full">
                            <ToggleGroup
                              type="single"
                              value={field.value as string}
                              onValueChange={field.onChange}
                            >
                              <ToggleGroupItem
                                value="APARTAMENTO"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Apartamento
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="CASA"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Casa
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                        )}
                      />
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-[#A2A7A9]">
                        Sociável com
                      </span>
                      <FormField
                        control={form.control}
                        name="sociableWith"
                        render={({ field }) => (
                          <div className="relative mt-2 w-full">
                            <ToggleGroup
                              type="single"
                              value={field.value as string}
                              onValueChange={field.onChange}
                            >
                              <ToggleGroupItem
                                value="OUTROS_ANIMAIS"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Outros animais
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="CRIANCAS"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Crianças
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="DESCONHECIDOS"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Desconhecidos
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col">
                    <div>
                      <span className="text-sm font-semibold text-[#A2A7A9]">
                        Cuidados veterinários
                      </span>
                      <FormField
                        control={form.control}
                        name="vetCare"
                        render={({ field }) => (
                          <div className="relative mt-2 w-full">
                            <ToggleGroup
                              type="single"
                              value={field.value as string}
                              onValueChange={field.onChange}
                            >
                              <ToggleGroupItem
                                value="CASTRADO"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Castrado
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="VACINADO"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Vacinado
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="VERMIFUGADO"
                                className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                              >
                                Vermifugado
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-col items-center justify-center">
                  <Button
                    type="submit"
                    className="h-[50px] w-full rounded-[20px] bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452] md:w-[280px]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 animate-spin" />
                    ) : (
                      'Cadastrar'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
