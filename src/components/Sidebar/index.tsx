'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { AdminBacklinks } from '@/constants'
import { Button } from '../ui/button'
import { FaPaw, FaUserFriends } from 'react-icons/fa'

export function Sidebar() {
  const pathname = usePathname()

  const iconMap = {
    '/animals': <FaPaw className="mr-2 h-5 w-5" />,
    '/users': <FaUserFriends className="mr-2 h-5 w-5" />,
    // Adicione mais ícones conforme necessário para cada rota
  }
  return (
    <>
      <aside className="bg-sidebar-texture flex flex-col gap-6 border-[#F4F9FF] bg-[#F4F9FF] px-3 py-[8px]">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 py-5">
            <Image
              src="/admin/head.svg"
              width={450}
              height={300}
              alt="logo-amigos-de-patinha"
            />
          </div>

          <nav className="flex flex-col items-center justify-center">
            <div className="flex h-[55px] w-full flex-col items-center justify-center px-2">
              {AdminBacklinks.map((link, index) => (
                <Button
                  key={'link_' + index}
                  className={`flex w-full justify-start bg-transparent text-right text-lg font-medium ${
                    pathname === link.url
                      ? 'rounded-[12px] bg-transparent font-semibold text-[#01377D] hover:shadow-md'
                      : 'text-[#A5B0D0] hover:shadow-md'
                  }`}
                  onClick={() => {}} // Adicione a função de clique necessária
                >
                  <div className="flex items-center space-x-2">
                    {link.title === 'animals' && <FaPaw size={22} />}{' '}
                    {link.title === 'users' && <FaUserFriends size={22} />}{' '}
                    <span>{link.title}</span>
                  </div>
                </Button>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
