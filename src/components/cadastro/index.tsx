'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FaCity, FaHouseUser, FaUserAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import type { MaskitoOptions } from '@maskito/core'
// import { useMaskito } from '@maskito/react'
import { useState } from 'react'
import { LockKeyhole, Mail } from 'lucide-react'
import { toast } from 'sonner'

// voltar aqui
const formSchema = z.object({
  name: z.string({
    required_error: 'Insira seu nome',
  }),
  city: z.string({
    required_error: 'Insira sua cidade',
  }),
  state: z.string({
    required_error: 'Insira seu estado',
  }),
  email: z
    .string({
      required_error: 'Insira seu email',
    })
    .email('Insira um email válido'),
  password: z.string({
    required_error: 'Insira uma senha',
  }),
})

export default function SectionCadastro() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  // const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // const inputRef = useMaskito({ options: digitsOnlyMask })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    fetch('/', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .catch((err) => {
        console.error(err)

        toast.error('Erro ao criar usuário')
      })
      .finally(() => setLoading(false))
  }

  if (success) {
    toast.success('Usuário criado com sucesso')
  }

  return (
    <>
      <section className="bg-[#f7f4f4] px-4 py-10 md:py-[110px]">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center">
          <div className="flex h-auto w-full flex-col items-center justify-center self-center rounded-[20px] bg-white shadow-2xl md:h-[530px]">
            <div className="flex-flex-col h-auto w-full max-w-[500px] items-center justify-center self-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-[50px] flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold text-[#01377D]">
                      Cadastre-se
                    </h2>
                    <span className="text-md font-semibold text-[#A2A7A9]">
                      Necessitamos dos seus dados para prosseguir
                    </span>
                  </div>
                  <div className="mb-5 flex flex-col gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <div className="relative w-full">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaUserAlt className="text-[#A2A7A9]" size={17} />
                          </span>
                          <Input
                            type="text"
                            id="name"
                            placeholder="nome"
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />

                    <div className="flex w-full flex-row gap-2">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <div className="relative w-full">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <FaHouseUser
                                className="text-[#A2A7A9]"
                                size={17}
                              />
                            </span>
                            <Input
                              type="text"
                              id="city"
                              placeholder="cidade"
                              className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                              {...field}
                            />
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <div className="relative w-full">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <FaCity className="text-[#A2A7A9]" size={20} />
                            </span>
                            <Input
                              type="text"
                              id="state"
                              placeholder="estado"
                              className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                              {...field}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <Mail className="text-[#A2A7A9]" size={20} />
                            </span>
                            <Input
                              type="email"
                              id="email"
                              placeholder="e-mail"
                              className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                              {...field}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockKeyhole
                                className="text-[#A2A7A9]"
                                size={20}
                              />
                            </span>
                            <Input
                              type="password"
                              id="password"
                              placeholder="senha"
                              className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                              {...field}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockKeyhole
                                className="text-[#A2A7A9]"
                                size={20}
                              />
                            </span>
                            <Input
                              type="password"
                              id="password"
                              placeholder="confirmar senha"
                              className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                              {...field}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="mt-5 flex flex-col items-center justify-center">
                      <Button className="h-[50px] w-full rounded-[20px] bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452] md:w-[280px]">
                        Entrar
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
