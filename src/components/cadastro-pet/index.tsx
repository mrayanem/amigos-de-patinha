'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FaHouseUser, FaPaw } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
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

// Atualizar o esquema de validação com os novos campos
const formSchema = z.object({
  name: z.string().nonempty('Insira o nome do pet'),
  sex: z.enum(['FEMEA', 'MACHO'], { required_error: 'Insira o sexo do pet' }),
  specieId: z.enum(['GATO', 'CACHORRO'], {
    required_error: 'Insira a espécie do pet',
  }),
  age: z.string().transform((age) => parseInt(age)),
  city: z.string().nonempty('Insira sua cidade'),
  state: z.string().nonempty('Insira seu estado'),
  animalSize: z.enum(['PEQUENO', 'MEDIO', 'GRANDE'], {
    required_error: 'Insira o porte do pet',
  }),
  description: z.string().optional(),
  photoAnimal: z.string().nonempty('Insira uma foto do pet'),
  livesWellIn: z
    .array(z.enum(['APARTAMENTO', 'CASA']))
    .nonempty('Selecione pelo menos uma opção para "Vive bem em"'),
  sociableWith: z
    .array(z.enum(['OUTROS_ANIMAIS', 'CRIANCAS', 'DESCONHECIDOS']))
    .nonempty('Selecione pelo menos uma opção para "Sociável com"'),
  vetCare: z
    .array(z.enum(['CASTRADO', 'VACINADO', 'VERMIFUGADO']))
    .nonempty('Selecione pelo menos uma opção para "Cuidados veterinários"'),
})

export default function SectionCadastroPet() {
  const [selectedImage, setSelectedImage] = useState('')
  const router = useRouter()
  const { createAnimal, isLoading } = useCreateAnimal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoAnimal: 'URL_QUALQUER',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createAnimal(values, {
      onSuccess: () => {
        toast.success('Cadastro realizado com sucesso!')
        router.replace('/')
      },
      onError: () => {
        toast.error('Erro ao cadastrar o animal.')
      },
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file.name) // Atualiza o estado com o nome do arquivo selecionado
      form.setValue('photoAnimal', file.name) // Atualiza o campo com o nome do arquivo
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
                  <div className="w-full">
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
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-row items-center gap-2">
                    <FormField
                      control={form.control}
                      name="specieId"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                              <SelectValue placeholder="Espécie" />
                            </SelectTrigger>
                            <SelectContent className="w-full ">
                              <SelectGroup className="font-bold text-[#A2A7A9]">
                                <SelectItem value="GATO">Gato</SelectItem>
                                <SelectItem value="CACHORRO">
                                  Cachorro
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                              <SelectValue placeholder="Sexo" />
                            </SelectTrigger>
                            <SelectContent className="w-full ">
                              <SelectGroup className="font-bold text-[#A2A7A9]">
                                <SelectItem value="FEMEA">Fêmea</SelectItem>
                                <SelectItem value="MACHO">Macho</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-row gap-2">
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
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="animalSize"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                              <SelectValue placeholder="Porte" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectGroup className="font-bold text-[#A2A7A9]">
                                <SelectItem value="PEQUENO">Pequeno</SelectItem>
                                <SelectItem value="MEDIO">Médio</SelectItem>
                                <SelectItem value="GRANDE">Grande</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-row gap-2">
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
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
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
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
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
                            className="h-[45px] rounded-[5px] border-none bg-[#F5F5F5] font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="mb-5 flex flex-col">
                  <span className="text-sm font-semibold text-[#A2A7A9]">
                    Vive bem em
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
                              field.onChange(e) // Atualiza o campo com o arquivo selecionado
                            }}
                          />
                          <Input
                            type="text"
                            value={selectedImage} // Exibe o nome do arquivo selecionado
                            placeholder="Selecionar foto do pet"
                            className="w-full rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9] md:w-[250px]"
                            onClick={() =>
                              document.getElementById('photoAnimal').click()
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
                    <div>
                      <span className="text-sm font-semibold text-[#A2A7A9]">
                        Vive bem em
                      </span>
                      <FormField
                        control={form.control}
                        name="livesWellIn"
                        render={({ field }) => (
                          <div className="relative mt-2 w-full">
                            <ToggleGroup
                              type="multiple"
                              value={field.value}
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
                  </div>

                  <div className="mb-5 flex flex-col">
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
                              type="multiple"
                              value={field.value}
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
                              type="multiple"
                              value={field.value}
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

                  <div className="mt-5 flex flex-col items-center justify-center">
                    <Button
                      type="submit"
                      className="h-[50px] w-full rounded-[20px] bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452] md:w-[280px]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        'Cadastrar'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
