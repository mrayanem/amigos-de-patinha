'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Backlinks } from '@/constants'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, User } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  // Function to render user menu based on session status
  const renderUserMenu = () => {
    if (session && status === 'authenticated') {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full border-none bg-[#01377D] p-2 text-white">
            <User className="h-[25px] w-[25px] text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Cadastrar animal</DropdownMenuItem>
            <DropdownMenuItem>Conta</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar perfil</DropdownMenuItem>
            <DropdownMenuItem>Alterar senha</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    } else {
      return (
        <>
          <Button
            asChild={true}
            className={
              'bg-transparent text-base font-medium text-black hover:text-zinc-500'
            }
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild={true}
            className={
              'rounded-full bg-[#01377D] text-base font-semibold text-white shadow shadow-[#009DD0] transition-all hover:bg-[#084390]'
            }
          >
            <Link href="/cadastro">Cadastre-se</Link>
          </Button>
        </>
      )
    }
  }

  return (
    <div
      className={'mt-2 flex w-full flex-col bg-transparent'}
      style={{ zIndex: 99 }}
    >
      <nav className="z-20 mx-5 flex w-full max-w-[1200px] justify-between self-center bg-transparent py-3 sm:mx-10 sm:px-4 lg:px-0">
        <div className="ml-4 flex max-w-screen-xl items-center justify-start md:ml-0">
          <Link href="/" className="relative flex items-center">
            <Image
              src="/logo-patinhas.svg"
              width={220}
              height={220}
              alt="logo-amigos-de-patinha"
            />
          </Link>
        </div>
        <div className="hidden h-[48px] w-full items-center justify-center lg:flex lg:w-auto">
          {Backlinks.map((link, index) => (
            <Button
              asChild={true}
              key={'link_' + index}
              className={
                pathname === link.url
                  ? 'rounded-full bg-[#01377D] text-base font-semibold text-white shadow shadow-[#009DD0] transition-all hover:bg-[#084390]'
                  : 'bg-transparent text-base font-medium text-black hover:text-zinc-500'
              }
            >
              <Link href={link.url}>{link.title}</Link>
            </Button>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <div className="hidden md:flex">{renderUserMenu()}</div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={'outline'}
                className="mr-2 rounded-[10px] border-slate-500 bg-transparent text-gray-500 hover:bg-slate-200 lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <div className="h-[48px] w-full flex-col items-center justify-center lg:flex lg:w-auto">
                {Backlinks.map((link, index) => (
                  <Button
                    asChild={true}
                    key={'mobile_link_' + index}
                    variant={'link'}
                    className={cn(
                      'block',
                      pathname === link?.url
                        ? 'text-base font-semibold text-black transition-all'
                        : 'text-base font-normal text-black',
                    )}
                  >
                    <Link href={link.url}>{link.title}</Link>
                  </Button>
                ))}
                {renderUserMenu()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="h-[1.5px] bg-zinc-300" />
    </div>
  )
}
