'use client'

import { FaCity, FaHouseUser, FaUserAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, LockKeyhole, Mail, Phone } from 'lucide-react'
import { toast } from 'react-toastify'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUsers } from '@/client/auth/useUsers'
import type { MaskitoOptions } from '@maskito/core'
import { useMaskito } from '@maskito/react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const formSchema = z
  .object({
    name: z.string({ required_error: 'Insira seu nome' }),
    telephone: z.string({ required_error: 'Insira seu telefone' }),
    city: z.string({ required_error: 'Insira sua cidade' }),
    state: z.string({ required_error: 'Insira seu estado' }),
    email: z
      .string({ required_error: 'Insira seu email' })
      .email('Insira um email válido'),
    // password: z.string({ required_error: 'Insira uma senha' }),
    // confirmPassword: z.string({ required_error: 'Confirme sua senha' }),
    role: z.enum(['client', 'admin'], {
      required_error: 'Selecione uma função',
    }),
  })
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: 'As senhas não correspondem',
  //   path: ['confirmPassword'],
  // })

const digitsOnlyMask: MaskitoOptions = {
  mask: [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
}

export default function SectionCadastroUsuario() {
  const router = useRouter()
  const { createUser, isLoading } = useUsers()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = { ...values, password: "amigosdapatinha@2024" }
    createUser(data, {
      onSuccess: () => {
        toast.success('Usúario cadastrado com sucesso!')
        setTimeout(() => router.push('/users'), 500)
      },
      onError: () => {
        toast.error('Erro ao criar usuario')
      },
    })
  }

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center self-center bg-[#f7f4f4]">
      <div className="flex h-full w-full max-w-[1000px] flex-col items-center justify-center self-center">
        <div className="flex h-auto w-full flex-col items-center justify-center rounded-[20px] bg-white shadow-2xl md:h-[530px]">
          <div className="flex h-auto w-full max-w-[500px] flex-col items-center justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-[50px] flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold text-[#01377D]">
                    Cadastre um usuario
                  </h2>
                  <span className="text-md font-semibold text-[#A2A7A9]">
                    Necessitamos dos seus dados para prosseguir
                  </span>
                </div>
                <div className="mb-5 flex w-full flex-col gap-3">
                  <div className="flex w-full flex-row gap-2">
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
                            placeholder="Nome"
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => {
                        const { ref, ...rest } = field
                        // const maskRef = useMaskito({
                        //   options: digitsOnlyMask,
                        // })
                        return (
                          <div className="relative w-full">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <Phone className="text-[#A2A7A9]" size={17} />
                            </span>
                            <Input
                              type="text"
                              id="telephone"
                              placeholder="Telefone"
                              className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                              //ref={maskRef}
                              {...rest}
                            />
                          </div>
                        )
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-row gap-2">
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
                            placeholder="Estado"
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
                            placeholder="E-mail"
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <Label className="text-md mb-2 font-semibold text-[#A2A7A9]">
                      Selecione seu papel:
                    </Label>
                    <RadioGroup
                      defaultValue="client"
                      onValueChange={(value) => form.setValue('role', value as any)}
                    >
                      <div className="flex items-center space-x-4 my-3">
                        <div className="flex items-center">
                          <RadioGroupItem
                            value="client"
                            id="client"
                            className="border-zinc-500 text-[#A2A7A9]"
                          />
                          <Label
                            htmlFor="client"
                            className="ml-2 text-[#A2A7A9]"
                          >
                            Cliente
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <RadioGroupItem
                            value="admin"
                            id="admin"
                            className="border-zinc-500 text-[#A2A7A9]"
                          />
                          <Label
                            htmlFor="admin"
                            className="ml-2 text-[#A2A7A9]"
                          >
                            Administrador
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  {/*<div className="w-full">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockKeyhole className="text-[#A2A7A9]" size={20} />
                          </span>
                          <Input
                            type="password"
                            id="password"
                            placeholder="Senha"
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
                      name="confirmPassword"
                      render={({ field }) => (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockKeyhole className="text-[#A2A7A9]" size={20} />
                          </span>
                          <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirmar senha"
                            className="rounded-[5px] border border-none bg-[#F5F5F5] pl-10 font-bold text-[#A2A7A9]"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>*/}
                </div>
                <div className="mt-5 flex flex-col items-center">
                  <Button
                    //type="submit"
                    onClick={() => { console.log(form.formState.errors); form.handleSubmit(onSubmit)}}
                    className="text-md h-[45px] w-full rounded-[20px] bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452] md:w-[280px]"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
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
