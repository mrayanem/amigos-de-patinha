'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
// import { FaUserAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import type { MaskitoOptions } from '@maskito/core'
// import { useMaskito } from '@maskito/react'
import { useState } from 'react'
import { useRegister } from '@/client/auth'
import { LockKeyhole, Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// voltar aqui
const formSchema = z.object({
  email: z
    .string({
      required_error: 'Insira seu email',
    })
    .email('Insira um email válido'),
  password: z.string({
    required_error: 'Insira uma senha',
  }),
})

export default function SectionLogin() {
  const { isLoading } = useRegister()

  const router = useRouter()
  const session = useSession()

  if (session.data?.user) {
    router.replace('/')
  }

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  // const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // const inputRef = useMaskito({ options: digitsOnlyMask })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    await signIn('credentials', { ...values, callbackUrl: '/' })
      .then(() => {
        setSuccess(true)
        form.reset()
      })
      .catch((err) => {
        console.error(err)

        toast.error('Erro ao criar usuário')
      })
      .finally(() => setLoading(false))
  }

  if (success) {
    toast.success('Usuário logado com sucesso')
  }

  return (
    <>
      <section className="bg-[#cedbec] px-4 py-10 md:py-[110px]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center">
          <div className="flex h-auto w-full flex-col items-center justify-between self-center rounded-[20px] bg-white shadow-2xl md:h-[530px] md:flex-row">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-t-[20px] bg-[#01377D] px-6 py-5 text-center text-white md:max-w-[300px] md:rounded-l-[20px] md:rounded-r-none md:py-0">
              <h2 className="text-[35px] font-bold">Crie sua conta</h2>
              <span className="text-sm font-medium">
                É necessário ter um cadastro para adotar ou doar um animazinho.
              </span>
              <Button className="text-md mt-4 h-[45px] w-full rounded-[20px] bg-[#99AFCB] font-bold text-white hover:bg-[#8eb4e7]">
                Cadastrar
              </Button>
            </div>
            <div className="flex-flex-col h-auto w-full items-center justify-center self-center px-5 py-5 md:px-[140px] md:py-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-[50px] flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold text-[#01377D]">
                      Boas-vindas de volta!
                    </h2>
                    <span className="text-md font-medium text-[#A2A7A9]">
                      Conecte-se novamente!
                    </span>
                  </div>
                  <div className="mb-5 flex flex-col gap-3">
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
                    <div className="mb-2 flex flex-col items-center justify-center">
                      <a
                        className="text-sm text-[#7C7C8A] underline hover:text-[#666676]"
                        href="#"
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Button
                        type="submit"
                        className="text-md h-[45px] w-full rounded-[20px] bg-[#01377D] font-bold text-white shadow-sm hover:bg-[#012452] md:w-[280px]"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          'Entrar'
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
    </>
  )
}
