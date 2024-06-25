'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Backlinks } from '@/constants'
// import { ModalContactForm } from '../contact/ModalContactForm'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

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
          <div className="hidden md:flex">
            <Button
              asChild={true}
              className={
                'bg-transparent text-base font-medium text-black hover:text-zinc-500'
              }
            >
              <a href="/login">Login</a>
            </Button>
            <Button
              asChild={true}
              className={
                'rounded-full bg-[#01377D] text-base font-semibold text-white shadow shadow-[#009DD0] transition-all hover:bg-[#084390]'
              }
            >
              <a href="/cadastro">Cadastre-se</a>
            </Button>
          </div>
          {/* <ModalContactForm
            trigger={
              <Button
                className={
                  'ml-4 hidden w-[140px] rounded-3xl border-2 bg-transparent lg:inline-block '
                }
              >
                Get In touch
              </Button>
            }
          /> */}
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
                <div className="flex flex-col items-start justify-start">
                  <Button
                    asChild={true}
                    className={
                      'bg-transparent text-base font-medium text-black hover:text-zinc-500'
                    }
                  >
                    <a href="/login">Login</a>
                  </Button>
                  <Button
                    asChild={true}
                    className={
                      'bg-transparent text-base font-medium text-black hover:text-zinc-500'
                    }
                  >
                    <a href="/cadastro">Cadastre-se</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="h-[1.5px] bg-zinc-300" />
    </div>
  )
}
