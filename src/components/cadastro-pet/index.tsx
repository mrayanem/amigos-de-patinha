'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  FaCity,
  FaHouseUser,
  FaInfoCircle,
  FaPaw,
  FaUserAlt,
} from 'react-icons/fa'
import { useForm, Controller } from 'react-hook-form'
import { Form, FormField } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTransition } from 'react'
import { Image, Loader2, LockKeyhole, Mail, Phone } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRegister } from '@/client/auth'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Define o esquema de validação com confirmação de senha

// erro ao usuário ser logado NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
const formSchema = z
  .object({
    namePet: z.string({ required_error: 'Insira o nome do pet' }),
    telephone: z.string({ required_error: 'Insira seu telefone' }),
    sexo: z.string({ required_error: 'Insira o sexo do pet' }),
    specie: z.string({ required_error: 'Insira a specie do pet' }),
    age: z.string({ required_error: 'Insira a idade do pet' }),
    city: z.string({ required_error: 'Insira sua cidade' }),
    state: z.string({ required_error: 'Insira seu estado' }),
    animalSize: z.string({ required_error: 'Insira o porte do pet' }),
    password: z.string({ required_error: 'Insira uma senha' }),
    description: z.string({ required_error: 'Insira a descrição' }),
    confirmPassword: z.string({ required_error: 'Confirme sua senha' }),
    animalPhoto: z.string({ required_error: 'Insira sua senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

export default function SectionCadastroPet() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { createUser, isSuccess } = useRegister()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const response = await createUser(values)
        if (response?.error) {
          toast.error('Erro ao criar usuário')
        } else {
          toast.success('Cadastro com sucesso! Você pode fazer login agora')
          form.reset()
          router.replace('/')
        }
      } catch (error) {
        toast.error('Erro ao criar usuário')
      }
    })
  }

  const StyledSelect = (props) => {
    return <Select {...props} className={props.className} />
  }

  return (
    <section className="bg-[#f7f4f4] px-4 py-10 md:py-[40px]">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center">
        <div className="flex h-auto w-full flex-col items-center justify-center self-center rounded-[20px] bg-white py-5 shadow-2xl md:h-auto">
          <div className="flex-flex-col h-auto w-full max-w-[500px] items-center justify-center self-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-[50px] flex flex-col items-center justify-center">
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
                      name="namePet"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaPaw className="text-[#A2A7A9]" size={17} />
                          </span>
                          <Input
                            type="text"
                            id="namePet"
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
                      name="specie"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <Select {...field}>
                            <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                              <SelectValue placeholder="Espécie" />
                            </SelectTrigger>
                            <SelectContent className="w-full ">
                              <SelectGroup className="font-bold text-[#A2A7A9]">
                                <SelectItem value="fem">Gato</SelectItem>
                                <SelectItem value="mac">Cachorro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sexo"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <Select {...field}>
                            <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                              <SelectValue placeholder="Sexo" />
                            </SelectTrigger>
                            <SelectContent className="w-full ">
                              <SelectGroup className="font-bold text-[#A2A7A9]">
                                <SelectItem value="fem">Fêmea</SelectItem>
                                <SelectItem value="mac">Macho</SelectItem>
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
                          <Select {...field}>
                            <SelectTrigger className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none">
                              <SelectValue placeholder="Porte" />
                            </SelectTrigger>
                            <SelectContent className="w-full ">
                              <SelectGroup className="font-bold text-[#A2A7A9]">
                                <SelectItem value="pequeno">Pequeno</SelectItem>
                                <SelectItem value="medio">Médio</SelectItem>
                                <SelectItem value="grande">Grande</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <Textarea
                          id="description"
                          placeholder="Sobre o pet"
                          className="h-[35px] rounded-[5px] border border-none bg-[#F5F5F5] font-bold text-[#A2A7A9]"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mb-5 flex flex-col">
                  <div className="w-full">
                    <span className="text-sm font-semibold text-[#A2A7A9]">
                      Foto do pet
                    </span>
                    <div className="relative mt-2 w-full">
                      <FormField
                        control={form.control}
                        name="animalPhoto"
                        render={({ field }) => (
                          <>
                            <input
                              type="file"
                              id="animalPhoto"
                              className="hidden"
                              {...field}
                            />
                            <label
                              htmlFor="animalPhoto"
                              className="flex w-full cursor-pointer items-center rounded-[5px] border border-none bg-[#F5F5F5] py-2 pl-4 font-semibold text-[#A2A7A9] md:w-[200px]"
                            >
                              <Image
                                className="mr-2 text-[#A2A7A9]"
                                size={17}
                              />
                              escolher arquivo
                            </label>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5 flex flex-col">
                  <div className="mb-2 flex flex-col items-center justify-center">
                    <span className="text-md font-semibold text-[#A2A7A9]">
                      informações complementares
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#A2A7A9]">
                      Vive bem em
                    </span>
                    <FormField
                      control={form.control}
                      name="animalSize"
                      render={({ field }) => (
                        <div className="relative mt-2 w-full">
                          <ToggleGroup type="multiple">
                            <ToggleGroupItem
                              value="apartamento"
                              className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                            >
                              Apartamento
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="casa"
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
                  <div className="mb-2 flex flex-col items-center justify-center">
                    <span className="text-md font-semibold text-[#A2A7A9]">
                      informações complementares
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#A2A7A9]">
                      Vive bem em
                    </span>
                    <FormField
                      control={form.control}
                      name="animalSize"
                      render={({ field }) => (
                        <div className="relative mt-2 w-full">
                          <ToggleGroup type="multiple">
                            <ToggleGroupItem
                              value="apartamento"
                              className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                            >
                              Apartamento
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="casa"
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
                  <div className="mb-2 flex flex-col items-center justify-center">
                    <span className="text-md font-semibold text-[#A2A7A9]">
                      informações complementares
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#A2A7A9]">
                      Vive bem em
                    </span>
                    <FormField
                      control={form.control}
                      name="animalSize"
                      render={({ field }) => (
                        <div className="relative mt-2 w-full">
                          <ToggleGroup type="multiple">
                            <ToggleGroupItem
                              value="apartamento"
                              className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                            >
                              Apartamento
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="casa"
                              className="w-full rounded-[5px] border-none bg-[#F5F5F5] py-2 font-bold text-[#A2A7A9] focus:outline-none"
                            >
                              Casa
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                      )}
                    />
                  </div>
                  <div className="mt-5 flex flex-col items-center justify-center">
                    <Button
                      type="submit"
                      className="h-[50px] w-full rounded-[20px] bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452] md:w-[280px]"
                    >
                      {isPending ? (
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
